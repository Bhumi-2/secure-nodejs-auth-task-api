import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { ApiError } from "../utils/error.js";

export const register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      throw new ApiError(400, "Name, email and password are required");
    }

    const existing = await User.findOne({ email });
    if (existing) {
      throw new ApiError(400, "Email already exists");
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed,
      role: role && ["user", "admin"].includes(role) ? role : "user"
    });

    const userObj = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    };

    res.status(201).json({
      message: "User registered successfully",
      user: userObj
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new ApiError(400, "Email and password are required");
    }

    const user = await User.findOne({ email });
    if (!user) {
      throw new ApiError(400, "Invalid credentials");
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new ApiError(400, "Invalid credentials");
    }

    const payload = { id: user._id, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d"
    });

    res.json({
      message: "Login successful",
      token
    });
  } catch (err) {
    next(err);
  }
};

export const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      throw new ApiError(404, "User not found");
    }
    res.json({ user });
  } catch (err) {
    next(err);
  }
};
