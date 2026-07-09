import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    excerpt: {
      type: String,
      required: true,
    },
    content: {
      type: String, // Markdown or HTML
      required: true,
    },
    game: {
      type: String,
      required: true, // e.g. "mlbb", "esports"
    },
    type: {
      type: String,
      required: true, // e.g. "Guides", "News"
    },
    tags: {
      type: [String],
      default: [],
    },
    image: {
      type: String, // URL
      default: "",
    },
    author: {
      type: String,
      default: "BlueBuff",
    },
    publishedAt: {
      type: Date,
      default: Date.now,
    },
    seo: {
      title: { type: String, default: "" },
      description: { type: String, default: "" },
      keywords: { type: [String], default: [] },
    },
  },
  { timestamps: true }
);

BlogSchema.index({ slug: 1 });
BlogSchema.index({ game: 1 });
BlogSchema.index({ type: 1 });
BlogSchema.index({ publishedAt: -1 });

export default mongoose.models.Blog || mongoose.model("Blog", BlogSchema);
