import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    university: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    subscription: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      required: true,
    },
    verificationToken: {
      type: String,
      required: true,
    },
    OTP: {
      type: String,
      default: null
  },
  imageUrl: {
      type: String,
  }
  },
  { timestamps: true }
);

userSchema.index({ OTP: 1 }, { expireAfterSeconds: 100 });
userSchema.index({ verificationToken: 1 }, { expireAfterSeconds: 86400 });

export default mongoose.models.User || mongoose.model("User", userSchema);