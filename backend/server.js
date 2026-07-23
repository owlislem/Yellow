import app from "./app.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "./config.env" });

const PORT = process.env.PORT || 3000;

// Database connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("✅ Database connected successfully");
  })
  .catch((error) => {
    console.error("❌ Database connection failed:", error.message);
    process.exit(1);
  });

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
});

  