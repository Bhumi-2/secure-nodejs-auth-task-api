import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import taskRoutes from "./routes/task.routes.js";
import { notFoundHandler, errorHandler } from "./utils/error.js";

const app = express();

app.use(cors());
app.use(express.json());

// API versioning base path: /api/v1
app.get("/api/v1/health", (req, res) => {
  res.json({ status: "ok", message: "Backend is running" });
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/tasks", taskRoutes);

// Not Found + Error handlers
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
