import { connectDB } from "@/lib/mongodb";
import Blocklist from "@/models/Blocklist";

/**
 * Automatically blocklists an IP, email, or gameId due to suspicious activity.
 * @param type "ip", "email", or "gameId"
 * @param value The actual IP, email, or gameId to block
 * @param reason The reason for auto-blocklisting
 */
export async function autoBlocklist(type: "ip" | "email" | "gameId", value: string, reason: string) {
  if (!value) return;

  try {
    await connectDB();
    const normalizedValue = type === "gameId" ? value.trim() : value.toLowerCase().trim();

    // Check if it already exists
    const existing = await Blocklist.findOne({ type, value: normalizedValue });
    if (!existing) {
      await Blocklist.create({
        type,
        value: normalizedValue,
        reason,
        addedBy: "system_auto",
      });
      console.log(`[AUTO-BLOCKLIST] Blocked ${type}: ${normalizedValue} for reason: ${reason}`);
    }
  } catch (error) {
    console.error("[AUTO-BLOCKLIST ERROR]:", error);
  }
}
