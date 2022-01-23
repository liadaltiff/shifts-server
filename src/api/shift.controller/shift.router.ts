import express from "express";
import Router from "express";
export const shiftRouter = express.Router();

import {
  createShift,
  getAllShifts,
  getOneShiftByDate,
  getAllShiftsByShiftPerson,
  offerShift,
  getTradedShift,
} from "./shift.repository";

shiftRouter.use(express.json());

shiftRouter.route("/").get(getAllShifts).post(createShift);
shiftRouter.route("/shiftperson/:shiftPersonId").get(getAllShiftsByShiftPerson);
shiftRouter.route("/date/:shiftDate/trade").patch(offerShift);
shiftRouter.route("/date/:shiftDate/traded").put(getTradedShift);
shiftRouter.route("/date/:shiftDate").get(getOneShiftByDate);

//jwtAuthz(["Soldier"]

export default shiftRouter;
