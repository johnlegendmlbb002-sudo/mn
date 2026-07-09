import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";
import jwt from "jsonwebtoken";
import User from "@/models/User";

// GET single blog by slug
export async function GET(req, { params }) {
  try {
    await connectDB();
    const { slug } = await params;
    
    const blog = await Blog.findOne({ slug });

    if (!blog) {
      return NextResponse.json({ success: false, message: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, blog });
  } catch (error) {
    console.error("GET Blog Error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}

// PUT update blog
export async function PUT(req, { params }) {
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

    const { slug } = await params;
    const data = await req.json();

    const updatedBlog = await Blog.findOneAndUpdate({ slug }, data, { new: true });

    if (!updatedBlog) {
      return NextResponse.json({ success: false, message: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, blog: updatedBlog });
  } catch (error) {
    console.error("PUT Blog Error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}

// DELETE a blog
export async function DELETE(req, { params }) {
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

    const { slug } = await params;
    
    const deletedBlog = await Blog.findOneAndDelete({ slug });

    if (!deletedBlog) {
      return NextResponse.json({ success: false, message: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Blog deleted" });
  } catch (error) {
    console.error("DELETE Blog Error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
