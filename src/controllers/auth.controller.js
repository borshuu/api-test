import { db } from "../database/index.js";

import jwt from "jsonwebtoken";
import { uuid } from "drizzle-orm/pg-core";
import { users } from "../database/schema.js";

// export const login = async (req, res) => {
//   const { email, password } = req.body;

//   // const user = db.select((users) => users.email === email);
//   console.log(email);

//   const user = db
//     .select()
//     .from(users)
//     .where((users) => users.email === email);
//   console.log(user.fields);
//   console.log(user.body);
//   console.log(user.);

//   if (!user) return res.status(401).json({ message: "Invalid credentials" });
//   console.log(user.email);
//   const token = jwt.sign(
//     {
//       username: user.username,
//       email: user.email,
//       id: user.id,
//     },
//     process.env.JWT_SECRET
//   );

//   res.json({
//     token,
//     user: {
//       username: user.username,
//       email: user.email,
//       id: user.id,
//     },
//   });
// };

export const login = async (req, res) => {
  try {
    // Extract email from the request body
    const { email } = req.body;

    // Check if email is provided
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    console.log(req.body.email);
    // Fetch user from the database based on email
    // const user = await db.query.users.findFirst({
    //   // where: { email: req.body.email },
    //   // where: (res) => res.email === req.body.email,

    // });

    const user = await db.query.users.findFirst({
      where: { email }, // Correct use of the where clause with object notation
    });

    console.log(user);
    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Log user information for debugging
    console.log("User fetched:", user);

    // Respond with user data
    res.json(user);
  } catch (error) {
    // Enhanced error handling to provide specific information
    console.error("Error fetching user:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await db
    .insert(users)
    .values({ name, email, password })
    .returning();

  res.json(user);
};

// export const register = async (req, res) => {
//   const { username, email, password } = req.body;
//   const users = readJson("users.json");

//   const user = users.find((user) => user.email === email);

//   if (user) return res.status(400).json({ message: "User already exists" });

//   const newUser = {
//     id: v4(),
//     username,
//     email,
//     password,
//   };

//   users.push(newUser);

//   saveJson("users.json", users);

//   res.json(newUser);
// };

// module.exports = { login, register };
