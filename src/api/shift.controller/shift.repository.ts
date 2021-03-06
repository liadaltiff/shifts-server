import Shift from "../../models/shift.model";
import { collections } from "../../DB/mongoConnection.service";
import { RequestHandler, Request, Response } from "express";
import { Server } from "socket.io";
import { io } from "../../server";
import jwt from "jsonwebtoken";

export const getAllShifts = async (_req: Request, res: Response) => {
  try {
    const shifts = (await collections.shifts
      ?.find({})
      .toArray()) as unknown as Shift[];
    res.status(200).send(shifts);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export const getAllShiftsByShiftPerson = async (
  req: Request,
  res: Response
) => {
  try {
    const { shiftPersonId } = req.params;
    const shifts = (await collections.shifts
      ?.find({ shiftPersonId: shiftPersonId })
      .toArray()) as unknown as Shift[];
    res.status(200).send(shifts);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export const getOneShiftByDate = async (req: Request, res: Response) => {
  try {
    const { shiftDate } = req.params;
    const shifts = await collections.shifts?.find({ shiftDate }).toArray();
    if (shifts && shifts.length !== 0) {
      res.status(200).send(shifts[0]);
    } else {
      res.status(400).send();
    }
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

// POST
export const createShift: RequestHandler = async (req, res) => {
  try {
    const newShift = req.body as Shift;
    newShift.traded = false;

    const { shiftDate } = req.body;

    await collections.shifts?.replaceOne({ shiftDate }, req.body, {
      upsert: true,
    });

    res.status(201).send(`Successfully created a new shift`);
  } catch (error: any) {
    console.error(error);
    res.status(400).send(error.message);
  }
};

export const offerShift: RequestHandler = async (req, res) => {
  try {
    const { traded } = req.body;
    const { shiftDate } = req.params;

    await collections.shifts?.findOneAndUpdate(
      { shiftDate },
      { $set: { traded } }
    );

    res.status(201).send(`Successfully updated the shift`);
    io.emit("new-notification");
  } catch (error: any) {
    console.error(error);
    res.status(400).send(error.message);
  }
};

export const getTradedShift: RequestHandler = async (req, res) => {
  try {
    const { traded } = req.body;
    const { shiftPerson } = req.body;
    const { shiftPersonId } = req.body;

    const { shiftDate } = req.params;

    await collections.shifts?.findOneAndUpdate(
      { shiftDate },
      { $set: { traded, shiftPerson, shiftPersonId } }
    );

    res.status(201).send(`Successfully updated the shift`);
  } catch (error: any) {
    console.error(error);
    res.status(400).send(error.message);
  }
};
