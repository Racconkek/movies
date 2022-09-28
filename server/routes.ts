import express, { Express } from "express";
import userRouter from "./routes/user";

export default function (app: Express): void {
  const router = express.Router();
  userRouter(router);

  app.use("/api", router);
}
