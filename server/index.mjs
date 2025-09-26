import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import eventRoutes from "./routes/eventRoutes.mjs";
import ticketRoutes from "./routes/ticketRoutes.mjs";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const MONGO_URI = process.env.MONGODB_URI;

app.use(cors());
app.use(express.json());
app.use("/api/events", eventRoutes);
app.use("/api/tickets", ticketRoutes);
app.get("/", (req, res) => {
  res.send("Welcome to JamJunction Admin API");
});

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

export default app;
