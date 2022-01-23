import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { connectToDatabase } from "./DB/mongoConnection.service";
import authRouter from "./api/authRouter";
import { userRouter } from "../src/api/user.controller/user.router";
import { shiftRouter } from "../src/api/shift.controller/shift.router";
import cors from "cors";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import { checkJwt } from "./api/middleware/auth.middleware";
import http from "http";

dotenv.config();

const app = express();
const port = process.env.PORT;

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.use("/auth", authRouter);
app.use(checkJwt);
app.use("/users", userRouter);
app.use("/shifts", shiftRouter);

const origin = process.env.FRONTEND_URL;

connectToDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server started at http://localhost:${port}`);
    });
  })
  .catch((error: Error) => {
    console.error("Database connection failed", error);
    process.exit();
  });

const server = http.createServer(app);
export const io = new Server(server, {
  cors: {
    origin,
    methods: ["GET", "POST"],
  },
});
server.listen(3001, () => {
  console.log("SERVER RUNNING");
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});
