// import jwt from "jsonwebtoken";
// import User from "../models/User.js";

// // Fungsi untuk autentikasi (memeriksa token)
// export const authenticate = (req, res, next) => {
//   const token = req.header("Authorization")?.replace("Bearer ", "");

//   if (!token) {
//     return res.status(401).json({ error: "Access denied. No token provided." });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded; // Menyimpan data user di request
//     next(); // Lanjutkan ke route handler
//   } catch (error) {
//     res.status(400).json({ error: "Invalid token" });
//   }
// };

// // Fungsi untuk otorisasi (memeriksa role)
// export const authorize = (role) => {
//   return (req, res, next) => {
//     if (req.user.role !== role) {
//       return res.status(403).json({ error: "Access denied. Insufficient permissions." });
//     }
//     next();
//   };
// };
