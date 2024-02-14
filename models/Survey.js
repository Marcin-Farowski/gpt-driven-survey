import mongoose from "mongoose";

const surveySchema = new mongoose.Schema({
  subcategories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subcategory" }],
  numQuestions: { type: Number, required: true },
});

export default mongoose.models.Survey || mongoose.model("Survey", surveySchema);
