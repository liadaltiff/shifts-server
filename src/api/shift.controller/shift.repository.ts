import Shift from "../../models/shift.model";
import { ObjectId } from "mongodb";
import { collections } from "../../DB/mongoConnectionShifts.service";
import express, { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";

export const getAllShifts = async (_req: Request, res: Response) => {
  try {
    //      ?.find({}, { projection: { password: 0 } })
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
    const { shiftPerson } = req.params;
    const shifts = (await collections.shifts
      ?.find({ shiftPerson: shiftPerson })
      .toArray()) as unknown as Shift[];
    res.status(200).send(shifts);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export const getOneShiftByDate = async (req: Request, res: Response) => {
  try {
    const { dateProp } = req.params;
    const shifts = await collections.shifts
      ?.find({ dateProp: dateProp })
      .toArray();
    if (shifts && shifts.length !== 0) {
      res.status(200).send(shifts[0]);
    } else {
      res.status(400).send();
    }
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

// GET ONE
export const getOneShift = async (req: Request, res: Response) => {
  try {
    const shift = (await collections.shifts?.findOne({
      _id: req.body._id,
    })) as Shift;
    if (!shift) {
      console.log("theres an error");
    }
  } catch (error: any) {
    console.log("got here 7");
    res.status(500).send(error.message);
  }
};

// POST
export const createShift = async (req: Request, res: Response) => {
  try {
    const newShift = req.body as Shift;
    await collections.shifts?.insertOne(newShift);
    res.status(201).send(`Successfully created a new shift`);
  } catch (error: any) {
    console.error(error);
    console.log("u got here");
    res.status(400).send(error.message);
  }
};
