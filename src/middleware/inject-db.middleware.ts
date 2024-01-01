import { TaskModel } from "./../model/task.model";

import { UserModel } from "./../model/user.model";
import { NextFunction, Request, Response } from "express";

export function injectDbIntoContext(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  if (req.db) {
    return next();
  }

  req.db = {
    user: new UserModel(),

    task: new TaskModel(),
  };

  next();
}
