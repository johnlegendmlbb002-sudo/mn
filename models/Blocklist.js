import mongoose from "mongoose";

const BlocklistSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["ip", "email", "gameId"],
      required: true,
    },
    value: {
      type: String,
      required: true,
      trim: true,
    },
    reason: {
      type: String,
      default: "",
    },
    addedBy: {
      type: String, // Admin User ID who added this
      default: "system",
    },
  },
  { timestamps: true }
);

// Prevent duplicate entries for the same type and value
BlocklistSchema.index({ type: 1, value: 1 }, { unique: true });
// Index for fast lookups during request checking
BlocklistSchema.index({ value: 1 });

export default mongoose.models.Blocklist || mongoose.model("Blocklist", BlocklistSchema);
