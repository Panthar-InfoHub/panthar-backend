import { Router } from "express";
import { registerUser } from "../controllers/userController.js";

export const userRouter = Router();

userRouter.post("/", registerUser)