// const express = require("express");
// const db = require("../database/index.js"); // Your Neon SQL database connection
// const jwt = require("jsonwebtoken");
// const cookieParser = require("cookie-parser");

// // Middleware to verify JWT from cookies
// const verifyToken = (req, res, next) => {
//   const token = req.cookies.token;

//   if (!token) {
//     return res
//       .status(401)
//       .json({ message: "Unauthorized. No token provided." });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded; // Attach user info to request
//     next();
//   } catch (err) {
//     return res.status(401).json({ message: "Unauthorized. Invalid token." });
//   }
// };

// // Get all categories
// const getCategories = async (req, res) => {
//   try {
//     const categories = await db.query("SELECT * FROM categories");
//     res.json(categories.rows);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Failed to fetch categories." });
//   }
// };

// // Create a new category
// const createCategory = async (req, res) => {
//   const { name, logo } = req.body;

//   if (!name || !logo) {
//     return res.status(400).json({ message: "Name and logo are required." });
//   }

//   try {
//     const newCategory = await db.query(
//       "INSERT INTO categories (name, logo) VALUES ($1, $2) RETURNING *",
//       [name, logo]
//     );

//     res.status(201).json(newCategory.rows[0]);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Failed to create category." });
//   }
// };

// // Export the controller functions
// module.exports = {
//   getCategories,
//   createCategory,
//   verifyToken,
// };
