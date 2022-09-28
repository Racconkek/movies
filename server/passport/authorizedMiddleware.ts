import { NextFunction, Request, Response } from "express";

export default function authorizedMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Response | void {
  console.log('get me');
  if (!req.user) {
    return res.sendStatus(401);
  }

  next();
}
