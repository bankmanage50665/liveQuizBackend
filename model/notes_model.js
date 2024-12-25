const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    chapter: {
      type: String,
      required: true,
      trim: true,
    },
    year: {
      type: Number,
      required: true,
      enum: [1, 2, 3, 4, 5], // Ensuring year is one of the allowed values
    },
  },
  {
    timestamps: true, // Automatically includes `createdAt` and `updatedAt` fields
  }
);

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;
