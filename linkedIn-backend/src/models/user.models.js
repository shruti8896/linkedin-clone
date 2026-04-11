import mongoose from "mongoose";
const userSchema = mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname: String,
    username: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: { type: String, required: true },
    headline: {
      type: String,
    },
    bio: {
      type: String,
    },
    profilePic: {
      type: String,
    },
    coverPic: {
      type: String,
    },
    location: {
      type: String,
    },
    experience: [
      {
        company: String,
        role: String,
        startDate: Date,
        endDate: Date,
        description: String,
      },
    ],
    education: [
      {
        school: String,
        degree: String,
        field: String,
        startDate: Date,
        enddate: Date,
      },
    ],
    connections: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    pendingRequests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    refreshToken: String,
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("User", userSchema);
