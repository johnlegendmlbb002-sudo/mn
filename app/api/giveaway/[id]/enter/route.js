import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Giveaway from "@/models/Giveaway";
import GiveawayEntry from "@/models/GiveawayEntry";
import User from "@/models/User";
import jwt from "jsonwebtoken";

export async function POST(req, { params }) {
  try {
    await connectDB();
    const { id } = await params;

    // Auth
    const authHeader = req.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer "))
      return NextResponse.json({ success: false, message: "Login required" }, { status: 401 });

    let decoded;
    try {
      decoded = jwt.verify(authHeader.split(" ")[1], process.env.JWT_SECRET);
    } catch {
      return NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 });
    }

    const userId = decoded.userId?.toString();
    const user = await User.findById(userId).select("name email");
    if (!user) return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });

    const giveaway = await Giveaway.findById(id);
    if (!giveaway || giveaway.status !== "live")
      return NextResponse.json({ success: false, message: "Giveaway not active" }, { status: 400 });

    if (giveaway.maxEntries > 0 && giveaway.entryCount >= giveaway.maxEntries)
      return NextResponse.json({ success: false, message: "Giveaway is full" }, { status: 403 });


    // Check duplicate
    const existing = await GiveawayEntry.findOne({ giveawayId: id, userId });
    if (existing)
      return NextResponse.json({ success: false, message: "Already entered" }, { status: 409 });

    const body = await req.json();
    const { mlbbId, mlbbServer, taskData, phone } = body;

    if (!phone)
      return NextResponse.json({ success: false, message: "Phone number is required" }, { status: 400 });

    await GiveawayEntry.create({
      giveawayId: id,
      userId,
      name: user.name || "",
      email: user.email || "",
      mlbbId,
      mlbbServer,
      phone,
      taskData: taskData || {},
    });

    // Increment entry count
    await Giveaway.findByIdAndUpdate(id, { $inc: { entryCount: 1 } });

    return NextResponse.json({ success: true, message: "Entered successfully" });
  } catch (err) {
    if (err.code === 11000)
      return NextResponse.json({ success: false, message: "Already entered" }, { status: 409 });
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
