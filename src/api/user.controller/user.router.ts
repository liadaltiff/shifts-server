import express from "express";
import Router from "express";
export const userRouter = express.Router();
import { checkPermissions } from "../middleware/permissions.middleware";

import { createUser, getAllUsers, login } from "./user.repository";

userRouter.use(express.json());

userRouter.route("/").get(getAllUsers).post(createUser);
userRouter.route("/login").post(login);
userRouter.route("/roles").get(getAllUsers);
// userRouter.use(checkPermissions(["Officer"]));

export default userRouter;
