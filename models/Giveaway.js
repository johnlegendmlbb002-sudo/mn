import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  label: { type: String, required: true },
  description: { type: String, default: "" },
  type: { type: String, enum: ["mlbb", "youtube", "whatsapp", "instagram", "link", "text", "checkbox"], default: "checkbox" },
  link: { type: String, default: "" },
  inputLabel: { type: String, default: "" },
  required: { type: Boolean, default: true },
}, { _id: false });

const GiveawaySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: "" },
  prize: { type: String, required: true },
  prizeCount: { type: Number, default: 1 },
  tasks: [TaskSchema],
  status: { type: String, enum: ["draft", "live", "ended"], default: "draft" },
  winners: [{ type: String }],
  startDate: { type: Date },
  endDate: { type: Date },
  entryCount: { type: Number, default: 0 },
  maxEntries: { type: Number, default: 0 }, // 0 means unlimited
}, { timestamps: true });

export default mongoose.models.Giveaway || mongoose.model("Giveaway", GiveawaySchema);
