import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Giveaway from "@/models/Giveaway";
import GiveawayEntry from "@/models/GiveawayEntry";
import jwt from "jsonwebtoken";

function adminAuth(req) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) return null;
  try {
    return jwt.verify(authHeader.split(" ")[1], process.env.JWT_SECRET);
  } catch {
    return null;
  }
}

export async function GET(req) {
  const decoded = adminAuth(req);
  if (!decoded) return NextResponse.json({ success: false }, { status: 401 });
  await connectDB();
  const giveaways = await Giveaway.find().sort({ createdAt: -1 });
  return NextResponse.json({ success: true, giveaways });
}

export async function POST(req) {
  const decoded = adminAuth(req);
  if (!decoded) return NextResponse.json({ success: false }, { status: 401 });
  await connectDB();
  const body = await req.json();
  const giveaway = await Giveaway.create(body);
  return NextResponse.json({ success: true, giveaway });
}

export async function PATCH(req) {
  const decoded = adminAuth(req);
  if (!decoded) return NextResponse.json({ success: false }, { status: 401 });
  await connectDB();
  const { id, ...updates } = await req.json();
  const giveaway = await Giveaway.findByIdAndUpdate(id, updates, { new: true });
  return NextResponse.json({ success: true, giveaway });
}

export async function DELETE(req) {
  const decoded = adminAuth(req);
  if (!decoded) return NextResponse.json({ success: false }, { status: 401 });
  await connectDB();
  const { id } = await req.json();
  if (!id) return NextResponse.json({ success: false, message: "ID required" }, { status: 400 });
  await Giveaway.findByIdAndDelete(id);
  await GiveawayEntry.deleteMany({ giveawayId: id });
  return NextResponse.json({ success: true });
}
