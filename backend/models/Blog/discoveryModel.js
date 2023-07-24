import mongoose from "mongoose";

const discoverySchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    cover: { type: String, default: "" },
    total: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const Discovery = mongoose.model("Discovery", discoverySchema);
export default Discovery;
