import mongoose from "mongoose";

const RateLimitSchema = new mongoose.Schema({
  identifier: { type: String, required: true }, // E.g., IP address + endpoint, or email
  count: { type: Number, default: 1 },
  expiresAt: { type: Date, required: true },
});

// TTL index on expiresAt - MongoDB will automatically delete documents where expiresAt is in the past
RateLimitSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
// Index for fast lookups
RateLimitSchema.index({ identifier: 1 });

delete mongoose.models.RateLimit;
export default mongoose.model("RateLimit", RateLimitSchema);
