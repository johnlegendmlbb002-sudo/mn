import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Giveaway from "@/models/Giveaway";
import jwt from "jsonwebtoken";
import User from "@/models/User";

// GET - fetch all live giveaways for rotating banner
export async function GET() {
  try {
    await connectDB();
    const giveaways = await Giveaway.find({ status: "live" }).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, giveaways });
  } catch (err) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
