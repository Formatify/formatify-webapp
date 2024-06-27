import mongoose from "mongoose";

const { Schema } = mongoose;

const authorSchema = new Schema(
  {
    userEmail: {
      type: String,
    },
    status: {
      type: String,
      enum: ["approved", "rejected", "pending"],
      default: "pending",
    },
  },
  { _id: false }
);

const projectSchema = new Schema({
  name: {
    type: String,
    required: [true, "Project name is required"],
  },
  template: {
    type: String,
    default: "",
  },
  authors: [authorSchema],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  type: {
    type: String,
    enum: {
      values: ["article", "thesis", "research"],
      message: "{VALUE} is not a valid type. Valid types are article, thesis",
    },
    required: [true, "Project type is required"],
  },
});

export default mongoose.models.Project ||
  mongoose.model("Project", projectSchema);
