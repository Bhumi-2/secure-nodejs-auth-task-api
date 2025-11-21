import jwt from "jsonwebtoken";
import { ApiError } from "../utils/error.js";

export const auth = (req, res, next) => {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    return next(new ApiError(401, "Not authorized, token missing"));
  }

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    next(new ApiError(401, "Invalid or expired token"));
  }
};
