import Router from "express";

import { createShift, getAllShifts, getOneShift } from "./shift.repository";

const shiftRouter = Router();

shiftRouter.route("/").get(getAllShifts).post(createShift);
shiftRouter.route("/shifts").get(getAllShifts);
shiftRouter.route("/:shiftId").get(getOneShift);

export default shiftRouter;
