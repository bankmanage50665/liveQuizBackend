const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    questions: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Question",
      },
    ],
    likedQuestions: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Question",
      },
    ],
    favoriteQuestions: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Question",
      },
    ],
    laterSolvedQuestions: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Question",
      },
    ],
    wrongAnsweredQuestions: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Question",
      },
    ],
    reportedQuestions: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Question",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
