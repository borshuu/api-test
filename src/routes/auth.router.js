import { login, register } from "../controllers/auth.controller.js";
import { Router } from "express";

const authRouter = Router();

authRouter.post("/register", register).get("/login", login)

export { authRouter };
