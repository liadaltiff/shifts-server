import User from "../../models/user.model";
import { ObjectId } from "mongodb";
import { collections } from "../../DB/mongoConnection.service";
import express, { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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
  try {
    const user = (await collections.users?.findOne({
      _id: req.body._id,
    })) as User;
    if (!user) {
      throw "can`t find that user";
    } else {
      bcrypt.compare(
        req.body.password,
        user.password as string,
        (err, resp) => {
          if (resp) {
            delete user?.password;
            const token = jwt.sign(user, process.env.JWT_SECRET!, {
              expiresIn: "1h",
            });
            res.cookie("token", token, {
              maxAge: 900000,
              httpOnly: true,
            });
            res.status(200).send(user);
          } else {
          }
        }
      );
    }
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

// POST
export const createUser = async (req: Request, res: Response) => {
  try {
    const newUser = req.body as User;
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(newUser.password as string, salt, async function (err, hash) {
        newUser.password = hash;
        newUser.role = "Soldier";
        await collections.users?.insertOne(newUser);
      });
    });
    res.status(201).send(`Successfully created a new user`);
  } catch (error: any) {
    console.error(error);
    res.status(400).send(error.message);
  }
};
