const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  phoneNumber: { type: Number, required: true, unique: true },
  otp: { type: String, required: false },
  otpExpiration: { type: Date, required: false },

  questions: [
    { type: mongoose.Types.ObjectId, required: true, ref: "Question" },
  ],
  // likes: [{ type: mongoose.Types.ObjectId, ref: "Question" }],
  // dislikes: [{ type: mongoose.Types.ObjectId, ref: "Question" }],
  // reports: [{ type: mongoose.Types.ObjectId, ref: "Question" }],
  // correct: [{ type: mongoose.Types.ObjectId, ref: "Question" }],
  // wrong: [{ type: mongoose.Types.ObjectId, ref: "Question" }],
  // laterSolves: [{ type: mongoose.Types.ObjectId, ref: "Question" }],
  // favorites: [{ type: mongoose.Types.ObjectId, ref: "Question" }],
});

const User = mongoose.model("User", userSchema);
module.exports = User;
