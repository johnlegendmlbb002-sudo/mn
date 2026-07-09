import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";
import jwt from "jsonwebtoken";
import User from "@/models/User";

// GET all blogs
export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const game = searchParams.get("game");
    const type = searchParams.get("type");

    let query = {};
    if (game && game !== "all") query.game = game;
    if (type && type !== "all") query.type = type;

    const blogs = await Blog.find(query).sort({ publishedAt: -1 });

    return NextResponse.json({ success: true, blogs });
  } catch (error) {
    console.error("GET Blogs Error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}

// POST create a new blog
export async function POST(req) {
  try {
    await connectDB();

    // Verify Admin/Owner
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const user = await User.findById(decoded.userId);
    if (!user || (user.userType !== "admin" && user.userType !== "owner")) {
      return NextResponse.json({ success: false, message: "Forbidden" }, { status: 403 });
    }

    const data = await req.json();

    // Create blog
    const newBlog = await Blog.create({
      ...data,
      slug: data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, ""),
    });

    return NextResponse.json({ success: true, blog: newBlog }, { status: 201 });
  } catch (error) {
    console.error("POST Blog Error:", error);
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, message: "Slug already exists" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
