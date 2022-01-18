import express from "express";
import Router from "express";
export const shiftRouter = express.Router();

import {
  createShift,
  getAllShifts,
  getOneShiftByDate,
  getAllShiftsByShiftPerson,
} from "./shift.repository";

shiftRouter.use(express.json());

shiftRouter.route("/").get(getAllShifts).post(createShift);
shiftRouter.route("/shiftperson/:shiftPersonId").get(getAllShiftsByShiftPerson);
shiftRouter.route("/date/:dateProp").get(getOneShiftByDate);

export default shiftRouter;
