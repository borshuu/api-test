import { users } from "../database/schema.js";
import { db } from "../database/index.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const login = async (req, res) => {
  const users = await db.query.users.findMany({
    with: {
      posts: true,
    },
  });

  res.json(users);
};

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await db
    .insert(users)
    .values({ name, email, password })
    .returning();

  res.json(user);
};
