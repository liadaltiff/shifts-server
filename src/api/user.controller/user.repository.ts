import User from "../../models/user.model";
import { ObjectId } from "mongodb";
import { collections } from "../../DB/mongoConnection.service";
import express, { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";

export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = (await collections.users
      ?.find({}, { projection: { password: 0 } })
      .toArray()) as unknown as User[];
    res.status(200).send(users);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};
// GET ONE
export const login = async (req: Request, res: Response) => {
  console.log("got here 1");

  try {
    console.log("got here 2");
    const user = (await collections.users?.findOne({
      _id: req.body._id,
    })) as User;
    if (!user) {
      console.log("got here 3");
      throw "can`t find that user";
    } else {
      console.log("got here 4");
      bcrypt.compare(req.body.password, user.password, (err, resp) => {
        if (resp) {
          console.log("got here 5");
          res.status(200).send(user);
        } else {
          console.log("got here 6");
        }
      });
    }
  } catch (error: any) {
    console.log("got here 7");
    res.status(500).send(error.message);
  }
};

// POST
export const createUser = async (req: Request, res: Response) => {
  try {
    const newUser = req.body as User;
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(newUser.password, salt, async function (err, hash) {
        newUser.password = hash;
        newUser.role = "Soldier";
        await collections.users?.insertOne(newUser);
      });
    });
    res.status(201).send(`Successfully created a new user`);
  } catch (error: any) {
    console.error(error);
    console.log("u got here");
    res.status(400).send(error.message);
  }
};
