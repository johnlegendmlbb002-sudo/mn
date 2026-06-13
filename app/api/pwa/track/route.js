import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import PwaInstall from "@/models/PwaInstall";

/* ── helpers ── */
function parseDevice(ua) {
  if (!ua) return { deviceType: "desktop", os: "Unknown", browser: "Unknown" };

  // OS detection
  let os = "Unknown";
  if (/android/i.test(ua)) os = "Android";
  else if (/iphone|ipad|ipod/i.test(ua)) os = "iOS";
  else if (/windows/i.test(ua)) os = "Windows";
  else if (/mac os/i.test(ua)) os = "macOS";
  else if (/linux/i.test(ua)) os = "Linux";

  // Browser detection
  let browser = "Unknown";
  if (/edg\//i.test(ua)) browser = "Edge";
  else if (/chrome/i.test(ua)) browser = "Chrome";
  else if (/safari/i.test(ua) && !/chrome/i.test(ua)) browser = "Safari";
  else if (/firefox/i.test(ua)) browser = "Firefox";
  else if (/opr|opera/i.test(ua)) browser = "Opera";

  // Device type
  let deviceType = "desktop";
  if (/ipad|tablet/i.test(ua)) deviceType = "tablet";
  else if (/mobile|iphone|android(?!.*tablet)/i.test(ua)) deviceType = "mobile";

  return { deviceType, os, browser };
}

function simpleHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash).toString(36);
}

/* ──────────────────────────────────────────
   POST /api/pwa/track
   Body: { event: "installed" | "active", userId? }
────────────────────────────────────────── */
export async function POST(req) {
  try {
    const body = await req.json();
    const { event, userId } = body;

    if (!["installed", "active"].includes(event)) {
      return NextResponse.json({ error: "Invalid event" }, { status: 400 });
    }

    const ua = req.headers.get("user-agent") || "";
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "0.0.0.0";
    const fingerprint = simpleHash(ip + ua);
    const { deviceType, os, browser } = parseDevice(ua);

    await connectDB();

    // For "active" events: only log once per day per fingerprint to avoid spam
    if (event === "active") {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const existing = await PwaInstall.findOne({
        fingerprint,
        event: "active",
        createdAt: { $gte: today },
      });
      if (existing) {
        return NextResponse.json({ ok: true, skipped: true });
      }
    }

    await PwaInstall.create({
      event,
      deviceType,
      os,
      browser,
      userAgent: ua.slice(0, 300),
      userId: userId || null,
      fingerprint,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[PWA track]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

/* ──────────────────────────────────────────
   GET /api/pwa/track
   Returns install + active stats
────────────────────────────────────────── */
export async function GET() {
  try {
    await connectDB();

    const [totalInstalls, totalActive, byDevice, byOS, byBrowser, recent] =
      await Promise.all([
        PwaInstall.countDocuments({ event: "installed" }),
        // Unique fingerprints that opened as standalone at least once
        PwaInstall.distinct("fingerprint", { event: "active" }).then(
          (a) => a.length
        ),
        // Device breakdown for installed
        PwaInstall.aggregate([
          { $match: { event: "installed" } },
          { $group: { _id: "$deviceType", count: { $sum: 1 } } },
          { $sort: { count: -1 } },
        ]),
        PwaInstall.aggregate([
          { $match: { event: "installed" } },
          { $group: { _id: "$os", count: { $sum: 1 } } },
          { $sort: { count: -1 } },
        ]),
        PwaInstall.aggregate([
          { $match: { event: "installed" } },
          { $group: { _id: "$browser", count: { $sum: 1 } } },
          { $sort: { count: -1 } },
        ]),
        // Last 10 installs
        PwaInstall.find({ event: "installed" })
          .sort({ createdAt: -1 })
          .limit(10)
          .select("deviceType os browser createdAt userId"),
      ]);

    return NextResponse.json({
      totalInstalls,
      totalActive,
      byDevice,
      byOS,
      byBrowser,
      recent,
    });
  } catch (err) {
    console.error("[PWA stats]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
