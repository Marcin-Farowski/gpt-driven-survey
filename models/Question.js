import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  surveyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Survey",
    required: true,
  },
  subcategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subcategory",
  },
});

export default mongoose.models.Question ||
  mongoose.model("Question", questionSchema);
