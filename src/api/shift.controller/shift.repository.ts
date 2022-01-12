import Shift, { IShift } from "../../models/shift.model";
import { Request, Response, NextFunction } from "express";

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find();

    return await res.status(200).json({
      status: 200,
      message: "Get All Users",
      users,
    });
  } catch (error: any) {
    return await res.status(500).json({ status: 500, error: error.message });
  }
};

export const getOneUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { _id } = req.params;
    const userById = await User.findById(_id).lean();

    const reply = {
      userById,
      error: null,
      status: userById ? 200 : 404,
      user: userById
        ? `found user with id: ${_id}`
        : `user with id: ${_id} is not found`,
    };

    return await res.status(reply.status).json(reply);
  } catch (error: any) {
    return await res.status(500).json({ status: 500, error: error.message });
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { fullName, _id, password } = req.body;

    if (!(fullName && _id && password)) {
      throw new Error("User Info Is Missing");
    }
    const newUser = new User({
      _id: _id,
      fullName: fullName,
      role: "Soldier",
      password: hashedPassword,
    });

    const foundUser = await User.findOne({
      _id: newUser._id,
    });

    try {
      if (foundUser === null) {
        const savedUser = await newUser.save();
        res.status(201).json(newUser);
      } else {
        res.status(409).send("This Account Already Exist");
      }
    } catch (err) {
      res.status(400).json({ err });
    }
  } catch (err) {
    res.status(400).json({ err });
  }
};
