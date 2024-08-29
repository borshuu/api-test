import { config } from "dotenv";
import express from "express";
import cors from "cors";
import { postsRouter, usersRouter } from "./routes/index.js";
import { authRouter } from "./routes/auth.router.js";
import { authMiddleware } from "./middlewares/auth.middleware.js";
// const { authMiddleware } = require("./middlewares/auth.middleware.js");
// import categoryRouter from "./routes/categories.route.js";

config();

const app = express();

const corsOrigin ={
  origin:'http://localhost:3000', //or whatever port your frontend is using
  credentials:true,            
  optionSuccessStatus:200
}
app.use(cors(corsOrigin));
app.use(express.json());
// app.use(cookieParser());

app.use("/posts", postsRouter);
app.use("/users", usersRouter);
app.use("/auth", authRouter);
app.use(authMiddleware);
// app.use("/categories", categoryRouter);

app.listen(3005, () => {
  console.log("Server is running on port 3005");
});
