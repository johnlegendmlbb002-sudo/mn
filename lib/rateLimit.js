import RateLimit from "@/models/RateLimit";
import { connectDB } from "@/lib/mongodb";

/**
 * Checks and increments a rate limit for a given identifier.
 * @param {string} identifier - Unique identifier (e.g., 'otp_192.168.1.1')
 * @param {number} limit - Maximum number of requests allowed in the window
 * @param {number} windowMinutes - Time window in minutes
 * @returns {Promise<boolean>} - True if request is allowed, false if limit exceeded
 */
export async function checkRateLimit(identifier, limit, windowMinutes) {
  await connectDB();

  const now = new Date();
  
  // Find the record for this identifier
  let record = await RateLimit.findOne({ identifier });

  if (!record) {
    // First time, create record
    await RateLimit.create({
      identifier,
      count: 1,
      expiresAt: new Date(now.getTime() + windowMinutes * 60 * 1000),
    });
    return true;
  }

  // If record exists and is not expired (MongoDB TTL might have a slight delay)
  if (record.expiresAt > now) {
    if (record.count >= limit) {
      return false; // Limit exceeded
    }
    
    // Increment count
    record.count += 1;
    await record.save();
    return true;
  } else {
    // Record is technically expired but not yet deleted by MongoDB TTL daemon
    record.count = 1;
    record.expiresAt = new Date(now.getTime() + windowMinutes * 60 * 1000);
    await record.save();
    return true;
  }
}
