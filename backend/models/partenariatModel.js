import mongoose from "mongoose";

const partenariatSchema = new mongoose.Schema(
  {
    isMarqueVendu: { type: Boolean, default: false, required: true },
    isPartenaire: { type: Boolean, default: false, required: true },
    isTrophe: { type: Boolean, default: false, required: true },
    marque: {
      nom: String,
      Image: String,
    },
    partenaire: {
      nom: String,
      Image: String,
    },
    trophe: {
      icon: String,
      num: String,
      name: String,
    },
  },
  {
    timestamps: true,
  }
);

const Partenariat = mongoose.model("Partenariat", partenariatSchema);
export default Partenariat;
