import { Router } from "express";
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask
} from "../controllers/task.controller.js";
import { auth } from "../middlewares/auth.middleware.js";
import { requireRole } from "../middlewares/role.middleware.js";

const router = Router();

// All task routes require authentication
router.use(auth);

// Example admin-only route (must be BEFORE "/:id" or it will never match)
router.get("/admin/all/list", requireRole("admin"), (req, res) => {
  res.json({
    message: "This is an example of an admin-only endpoint for tasks"
  });
});

// POST /api/v1/tasks  -> Create
router.post("/", createTask);

// GET /api/v1/tasks   -> Read all (for current user)
router.get("/", getTasks);

// GET /api/v1/tasks/:id -> Read one
router.get("/:id", getTaskById);

// PUT /api/v1/tasks/:id -> Update
router.put("/:id", updateTask);

// DELETE /api/v1/tasks/:id -> Delete
router.delete("/:id", deleteTask);

export default router;
