import express, { Express } from 'express';
import userRouter from './routes/user';
import moviesRouter from './routes/movies';
import tagsRouter from './routes/tags';

export default function (app: Express): void {
  const router = express.Router();
  userRouter(router);
  moviesRouter(router);
  tagsRouter(router);

  app.use('/api', router);
}
