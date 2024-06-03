import app from "./app.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });

mongoose.connect(process.env.MONGO_URL, {}).then((con) => {
    console.log(con.connections);
  });
  app.listen("3000", () => {
    console.log("Server Listening in Port 3000 ... ");
  });

  