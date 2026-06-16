import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import jwt from "jsonwebtoken";

export async function POST(req, { params }) {
  try {
    await connectDB();
    const { id } = params;

    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Verify Admin/Owner status
    const adminUser = await User.findById(decoded.userId);
    if (!adminUser || !["admin", "owner"].includes(adminUser.userType)) {
      return NextResponse.json({ success: false, message: "Forbidden" }, { status: 403 });
    }

    const targetUser = await User.findByIdAndUpdate(id, { forceLogout: true });
    if (!targetUser) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "User scheduled for forced logout" });
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
