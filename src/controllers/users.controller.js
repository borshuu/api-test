import { db } from "../database/index.js";
import { users } from "../database/schema.js";

export const getUsers = async (req, res) => {
  const users = await db.query.users.findMany({
    with: {
      posts: true,
    },
  });

  res.json(users);
};

export const createUser = async (req, res) => {
  const { name, email } = req.body;

  const user = await db.insert(users).values({ name, email }).returning();

  res.json(user);
};


export const getMe = async (req, res) => {
  try {
    const user = req.user;

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// module.exports = { getMe };