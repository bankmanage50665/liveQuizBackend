const mongoose = require("mongoose");

// Question Schema
const QuestionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
      trim: true,
    },
    options: [
      {
        type: String,
        required: true,
        trim: true,
      },
    ],
    correctAnswer: {
      type: String,
      required: true,
      trim: true,
    },
    board: {
      type: String,
      trim: true,
      default: "",
    },
    class: {
      type: String,
      trim: true,
      default: "",
    },
    subject: {
      type: String,
      trim: true,
      default: "",
    },
    topic: {
      type: String,
      trim: true,
      default: "",
    },
    exam: {
      type: String,
      trim: true,
      default: "",
    },
    creator: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likes: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
    favorites: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
    reports: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
    solvedLater: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Adds updatedAt along with createdAt
    runValidators: true,
  },
  {
    // Enable additional validation
    runValidators: true,
  }
);

// Create the model
const Question = mongoose.model("Question", QuestionSchema);
module.exports = Question;
