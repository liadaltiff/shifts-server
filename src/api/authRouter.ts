import Router from "express";
import express from "express";
import { createUser, login } from "./user.controller/user.repository";
export const authRouter = express.Router();

authRouter.post("/login", login);
authRouter.post("/register", createUser);

export default authRouter;
