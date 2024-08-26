import { login, register } from "../controllers/auth.controller.js";
import { createUser, getUsers } from "../controllers/users.controller.js";
import { Router } from "express";

const usersRouter = Router();

usersRouter.post("/register", register).get("/login", login)

export { usersRouter };
