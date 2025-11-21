import Task from "../models/task.model.js";
import { ApiError } from "../utils/error.js";

// CREATE
export const createTask = async (req, res, next) => {
  try {
    const { title, description, status } = req.body;

    if (!title) {
      throw new ApiError(400, "Title is required");
    }

    const task = await Task.create({
      title,
      description,
      status: status || "pending",
      createdBy: req.user.id
    });

    res.status(201).json({ message: "Task created", task });
  } catch (err) {
    next(err);
  }
};

// READ ALL (for current user)
export const getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ createdBy: req.user.id }).sort({
      createdAt: -1
    });
    res.json({ tasks });
  } catch (err) {
    next(err);
  }
};

// READ ONE
export const getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      createdBy: req.user.id
    });
    if (!task) {
      throw new ApiError(404, "Task not found");
    }
    res.json({ task });
  } catch (err) {
    next(err);
  }
};

// UPDATE
export const updateTask = async (req, res, next) => {
  try {
    const { title, description, status } = req.body;

    const task = await Task.findOne({
      _id: req.params.id,
      createdBy: req.user.id
    });

    if (!task) {
      throw new ApiError(404, "Task not found");
    }

    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (status !== undefined) task.status = status;

    await task.save();

    res.json({ message: "Task updated", task });
  } catch (err) {
    next(err);
  }
};

// DELETE
export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user.id
    });

    if (!task) {
      throw new ApiError(404, "Task not found");
    }

    res.json({ message: "Task deleted" });
  } catch (err) {
    next(err);
  }
};
