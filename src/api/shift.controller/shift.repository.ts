import Shift from "../../models/shift.model";
import { collections } from "../../DB/mongoConnectionShifts.service";
import { RequestHandler, Request, Response } from "express";

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
    const { dateProp } = req.params;
    const shifts = await collections.shifts?.find({ dateProp }).toArray();
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
// export const getOneShift = async (req: Request, res: Response) => {
//   try {
//     const shift = (await collections.shifts?.findOne({
//       _id: req.body._id,
//     })) as Shift;
//     if (!shift) {
//       console.log("theres an error");
//     }
//   } catch (error: any) {
//     res.status(500).send(error.message);
//   }
// };

// POST
export const createShift: RequestHandler = async (req, res) => {
  try {
    const newShift = req.body as Shift;
    newShift.isTradable = false;

    const { dateProp } = req.body;
    console.log("dateprop is:", dateProp);

    await collections.shifts?.replaceOne({ dateProp }, req.body, {
      upsert: true,
    });

    res.status(201).send(`Successfully created a new shift`);
  } catch (error: any) {
    console.error(error);
    res.status(400).send(error.message);
  }
};

export const tradeShift = async (req: Request, res: Response) => {
  try {
    console.log("got here");
    // const { isTradable } = req.body;
    const { dateProp } = req.params;
    console.log("dateprop is:", dateProp);

    // await collections.shifts?.findOneAndUpdate({ dateProp }, { x });

    res.status(201).send(`Successfully updated the shift`);
  } catch (error: any) {
    console.error(error);
    res.status(400).send(error.message);
  }
};
