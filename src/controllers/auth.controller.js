import { users } from "../database/schema.js";
import { db } from "../database/index.js";



export const login = async (req, res) => {
    const users = await db.query.users.findMany({
      with: {
        posts: true,
      },
    });
  
    res.json(users);
  };

// const register = async (req, res) => {
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


export const register = async (req, res) => {
    const { name, email,password } = req.body;
  
    const user = await db.insert(users).values({ name, email, password }).returning();
  
    res.json(user);
  };
  
