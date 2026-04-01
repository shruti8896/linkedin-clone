import mongoose from "mongoose";
const userSchema = mongoose.Schema(
  {
    firstname: String,
    lastname: String,
    username: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
    },
    password: String,
    refreshToken: String,
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("User", userSchema);
