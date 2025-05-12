import express from "express";
import Task from "../models/Task.js";

export const router = express.Router();

// Get all tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: error.message });
  }
});

// Create a new task
router.post("/", async (req, res) => {
  console.log("Received task creation request with body:", req.body);

  try {
    // Validate required fields
    const { title, description, dueDate } = req.body;
    if (!title || !description || !dueDate) {
      console.error("Missing required fields:", {
        title,
        description,
        dueDate,
      });
      return res.status(400).json({
        message: "Missing required fields",
        details: { title, description, dueDate },
      });
    }

    const task = new Task(req.body);
    console.log("Created task instance:", task);

    const validationError = task.validateSync();
    if (validationError) {
      console.error("Validation error:", validationError);
      return res.status(400).json({
        message: "Validation error",
        errors: validationError.errors,
      });
    }

    const newTask = await task.save();
    console.log("Task saved successfully:", newTask);
    res.status(201).json(newTask);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(400).json({
      message: "Error creating task",
      error: error.message,
      stack: error.stack,
    });
  }
});
