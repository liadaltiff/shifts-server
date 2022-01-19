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

// shiftRouter.get("/traded", async (req, res) => collection.shifts.find({traded: true}))

// /shift/:id/traded - Wants to trade shift ( changes traded prop ) + /shift/:id/trade - Trades shifts
// Route that changes only traded -> PATCH shift/date/:shiftDate/traded
// Route that trades shift -> PATCH shift/date/:shiftDate/trade -> body: { name: dynamic, id: dynamic, traded: *false* }
export default shiftRouter;
