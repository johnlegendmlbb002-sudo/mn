import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Giveaway from "@/models/Giveaway";
import GiveawayEntry from "@/models/GiveawayEntry";
import jwt from "jsonwebtoken";

export async function GET(req, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const giveaway = await Giveaway.findById(id);
    if (!giveaway) return NextResponse.json({ success: false, message: "Not found" }, { status: 404 });

    // Check if current user already entered
    let hasEntered = false;
    const authHeader = req.headers.get("authorization");
    if (authHeader?.startsWith("Bearer ")) {
      try {
        const decoded = jwt.verify(authHeader.split(" ")[1], process.env.JWT_SECRET);
        const entry = await GiveawayEntry.findOne({ giveawayId: id, userId: decoded.userId?.toString() });
        hasEntered = !!entry;
      } catch {}
    }

    return NextResponse.json({ success: true, giveaway, hasEntered });
  } catch (err) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
