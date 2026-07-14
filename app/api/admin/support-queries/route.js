import { connectDB } from "@/lib/mongodb";
import SupportQuery from "@/models/SupportQuery";
import jwt from "jsonwebtoken";

/* ================= AUTH (ADMIN ONLY) ================= */
function verifyAdmin(req) {
  const auth = req.headers.get("authorization");
  if (!auth?.startsWith("Bearer ")) {
    throw { status: 401, message: "Unauthorized" };
  }

  const token = auth.split(" ")[1];
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    throw { status: 401, message: "Invalid or expired token" };
  }

  if (decoded.userType !== "admin" && decoded.userType !== "owner") {
    throw { status: 403, message: "Forbidden" };
  }

  return decoded;
}

/* ================= GET ALL QUERIES ================= */
export async function GET(req) {
  try {
    await connectDB();
    verifyAdmin(req);

    /* ================= STATS ================= */
    const startOfDay = new Date(new Date().setHours(0, 0, 0, 0));

    const [openCount, todayCount] = await Promise.all([
      SupportQuery.countDocuments({ status: { $in: ["open", "in_progress"] } }),
      SupportQuery.countDocuments({ createdAt: { $gte: startOfDay } }),
    ]);

    return Response.json({
      success: true,
      stats: {
        open: openCount,
        today: todayCount,
      },
    });
  } catch (err) {
    return Response.json(
      { success: false, message: err.message || "Server error" },
      { status: err.status || 500 }
    );
  }
}
