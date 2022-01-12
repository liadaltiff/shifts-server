import express from "express";
import Router from "express";
export const shiftRouter = express.Router();

import { createShift, getAllShifts } from "./shift.repository";

shiftRouter.use(express.json());

shiftRouter.route("/").get(getAllShifts).post(createShift);
shiftRouter.route("/").get(getAllShifts);

export default shiftRouter;
