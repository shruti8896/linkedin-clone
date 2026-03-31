import app from "./src/app.js";
import connectDB from "./src/config/db.js";
import mongoose from "mongoose";
const PORT = process.env.PORT || 5500;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("ENV:", process.env.MONGO_URL);
    console.log("Connected DB:", mongoose.connection.name);
    console.log(`Server running on PORT ${PORT}`);
  });
});
