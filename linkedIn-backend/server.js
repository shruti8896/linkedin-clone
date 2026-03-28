import app from "./src/app.js";
import connectDB from "./src/config/db.js";

const PORT = process.env.PORT || 5500;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
  });
});