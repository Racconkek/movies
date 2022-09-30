import express, { Express } from "express";
import userRouter from "./routes/user";
import moviesRouter from "./routes/movies";

export default function (app: Express): void {
  const router = express.Router();
  userRouter(router);
  moviesRouter(router);

  app.use("/api", router);
}
