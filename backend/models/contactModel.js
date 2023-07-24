import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    object: { type: String, required: true, min: 2, max: 30 },
    email: {
      type: String,
      required: true,
      max: 30,
    },
    telephone: {
      type: String,
      required: true,
      max: 20,
    },
    refcommande: {
      type: String,
      default: "",
    },
    fichier: {
      type: String,
      default: "",
    },
    message: {
      type: String,
      required: true,
    },
    statut: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Contact = mongoose.model("Contact", contactSchema);
export default Contact;
