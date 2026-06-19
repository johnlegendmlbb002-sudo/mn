import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Giveaway from "@/models/Giveaway";
import GiveawayEntry from "@/models/GiveawayEntry";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import User from "@/models/User";

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
        const userIdStr = decoded.userId?.toString();
        
        let user = null;
        if (mongoose.isValidObjectId(userIdStr)) {
          user = await User.findById(userIdStr).select("userId");
        }
        if (!user) {
          user = await User.findOne({ userId: userIdStr }).select("userId");
        }
        
        const possibleIds = [userIdStr];
        if (user && user.userId) possibleIds.push(user.userId);

        const entry = await GiveawayEntry.findOne({ giveawayId: id, userId: { $in: possibleIds } });
        hasEntered = !!entry;
      } catch (err) {
        console.error("hasEntered check error:", err);
      }
    }

    return NextResponse.json({ success: true, giveaway, hasEntered });
  } catch (err) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
