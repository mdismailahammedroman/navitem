import dotenv from "dotenv";
import mongoose from "mongoose";
import server from "./app";
import "../src/app/config/socket";

dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/mail-server";

async function main() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected successfully");

    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
}

main();
