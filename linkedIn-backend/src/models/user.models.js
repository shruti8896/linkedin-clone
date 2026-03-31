import mongoose from "mongoose";
const userSchema = mongoose.Schema(
  {
    firstname: String,
    lastname: String,
    username: String,
    email: {
      type: String,
      unique: true,
    },
    password: String,
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("User", userSchema);
