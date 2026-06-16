import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Giveaway from "@/models/Giveaway";
import jwt from "jsonwebtoken";
import User from "@/models/User";

export async function GET(req) {
  try {
    await connectDB();
    const giveaways = await Giveaway.find({ status: "live" }).sort({ createdAt: -1 });

    let wonGiveaways = [];
    const authHeader = req.headers.get("authorization");
    if (authHeader && authHeader.startsWith("Bearer ")) {
      try {
        const decoded = jwt.verify(authHeader.split(" ")[1], process.env.JWT_SECRET);
        const userId = decoded.userId?.toString();
        if (userId) {
          wonGiveaways = await Giveaway.find({ winners: userId }).sort({ updatedAt: -1 });
        }
      } catch (e) {
        // ignore invalid token
      }
    }

    return NextResponse.json({ success: true, giveaways, wonGiveaways });
  } catch (err) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
