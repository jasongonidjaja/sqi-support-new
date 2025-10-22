import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// Login Route
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Cari user berdasarkan username
    const user = await User.findOne({ where: { username } });

    // Jika user tidak ditemukan
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    // Memeriksa password secara langsung (tanpa enkripsi)
    if (user.password !== password) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // Kirim token ke frontend
    res.json({ token });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ error: "Failed to login" });
  }
});

export default router;
