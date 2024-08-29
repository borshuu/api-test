import { db } from "../database/index.js";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";
import { uuid } from "drizzle-orm/pg-core";
import { users } from "../database/schema.js";

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await db.query.users.findFirst({
      where: eq(email, email),
    });

    console.log('this is getting called',user)

    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    res.json(user);
  } catch (error) {
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
