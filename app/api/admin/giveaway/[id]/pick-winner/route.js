import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Giveaway from "@/models/Giveaway";
import GiveawayEntry from "@/models/GiveawayEntry";
import jwt from "jsonwebtoken";

export async function POST(req, { params }) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) return NextResponse.json({ success: false }, { status: 401 });
  try { jwt.verify(authHeader.split(" ")[1], process.env.JWT_SECRET); } catch { return NextResponse.json({ success: false }, { status: 401 }); }

  await connectDB();
  const { id } = await params;
  const { count = 1 } = await req.json();

  const entries = await GiveawayEntry.find({ giveawayId: id, isWinner: false });
  if (!entries.length) return NextResponse.json({ success: false, message: "No entries" }, { status: 400 });

  // Fisher-Yates shuffle and pick N
  const shuffled = [...entries].sort(() => Math.random() - 0.5);
  const winners = shuffled.slice(0, Math.min(count, shuffled.length));
  const winnerIds = winners.map(w => w.userId);

  // Mark winners in entries
  await GiveawayEntry.updateMany(
    { giveawayId: id, userId: { $in: winnerIds } },
    { isWinner: true }
  );

  // Save winners on giveaway and set ended
  await Giveaway.findByIdAndUpdate(id, {
    winners: winnerIds,
    status: "ended",
  });

  return NextResponse.json({ success: true, winners: winners.map(w => ({ userId: w.userId, name: w.name, email: w.email, mlbbId: w.mlbbId })) });
}
