import mongoose from "mongoose";

const registerSchema = mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  birthDate: {
    type: Date,
    required: true,
  },
  source: {
    type: String,
    enum: ["social media", "friends", "found myself"],
    required: true,
  },
  eventId: {
    type: mongoose.Schema.Types.ObjectId, 
    required: true,
  },
}, { timestamps: true });

export const Register = mongoose.model("Register", registerSchema);
