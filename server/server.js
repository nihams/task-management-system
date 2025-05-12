import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { router as taskRoutes } from "./routes/tasks.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Debug middleware to log requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`, req.body);
  next();
});

// Routes
app.use("/api/tasks", taskRoutes);

// MongoDB connection with detailed logging
const connectDB = async () => {
  try {
    const mongoURI =
      process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/task-management";
    console.log("Attempting to connect to MongoDB at:", mongoURI);
    const conn = await mongoose.connect(mongoURI);
    console.log(`MongoDB Connected successfully at: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

// Handle MongoDB connection events
mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

mongoose.connection.on("connected", () => {
  console.log("MongoDB connected");
});

// Connect to MongoDB then start server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to start server:", error);
    process.exit(1);
  });
