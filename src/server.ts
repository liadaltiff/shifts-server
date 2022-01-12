import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { connectToUsersDatabase } from "./DB/mongoConnection.service";
import { connectToShiftsDatabase } from "./DB/mongoConnectionShifts.service";

import appRouter from "./api/appRouter";
import { userRouter } from "../src/api/user.controller/user.router";
import { shiftRouter } from "../src/api/shift.controller/shift.router";

const app = express();
const port = process.env.PORT;
const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use("/users", userRouter);
app.use("/shifts", shiftRouter);

connectToShiftsDatabase();
connectToUsersDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server started at http://localhost:${port}`);
    });
  })
  .catch((error: Error) => {
    console.error("Database connection failed", error);
    process.exit();
  });
