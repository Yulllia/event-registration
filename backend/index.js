import express from "express";
import mongoose from "mongoose";
import registerRoute from "./routes/registerRoute.js";
import eventsRoute from "./routes/eventsRoute.js";
import cors from "cors";
import agenda from "./agenda/agenda.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const mongoDBURL = process.env.MONGODB_URL;

// Middleware for parsing request body
app.use(express.json());
app.use(cors());

app.use("/events", eventsRoute);
app.use("/register", registerRoute);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

await agenda.start();
console.log("Agenda started");

await agenda.every("2 hours", "eventSaveDatabase");

async function graceful() {
  await agenda.stop();
  process.exit(0);
}
process.on("SIGTERM", graceful);
process.on("SIGINT", graceful);
