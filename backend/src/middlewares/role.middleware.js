import { ApiError } from "../utils/error.js";

export const requireRole = (role) => {
  return (req, res, next) => {
    if (!req.user || req.user.role !== role) {
      return next(new ApiError(403, "Forbidden: insufficient permissions"));
    }
    next();
  };
};
