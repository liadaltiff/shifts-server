import Router from "express";
import userRouter from "./user.controller/user.router";

const appRouter = Router();

appRouter.use("/users", userRouter);
// appRouter.use("/shifts",shiftRouter)

export default appRouter;
