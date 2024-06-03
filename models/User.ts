import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    userName: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    country: {
      type: String,
    },
    city: {
      type: String,
    },
    university: {
      type: String,
    },
    department: {
      type: String,
    },
    subscription: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      required: true,
    },
    verificationToken: {
      type: String,
    },
    isSocialSignup: {
      type: Boolean,
      default: false,
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