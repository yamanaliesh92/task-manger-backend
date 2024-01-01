import { NextFunction, Request, Response } from "express";

import { ObjectId } from "mongodb";
import { ICreateTask } from "src/model/type.model";

const allowKeys = ["name", "email", "password"];

interface ICreateUser {
  email: string;
  name: string;
  password: string;
}

export function sanitizeRequest(body: any) {
  const actuallyBody: any = {};

  Object.entries(body).forEach((value) => {
    console.log(body);
    console.log(value);
  });

  Object.keys(body).forEach((key) => {
    if (allowKeys.includes(key)) {
      actuallyBody[key] = body[key];
    }
  });
  return actuallyBody;
}

export const validationUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const sanitizeBody: ICreateUser = sanitizeRequest(req.body);
  const name = sanitizeBody.name;
  const password = sanitizeBody.password;
  const email = sanitizeBody.password;

  const error: string[] = [];

  if (Object.keys(req.body).length === 0) {
    error.push("body is empty");
  }

  if (!name) {
    error.push("name is required");
  }

  if (!email) {
    error.push("email is required");
  }

  if (!password) {
    error.push("password is required");
  }

  if (typeof password !== "string") {
    error.push(`password have to string but I got ${typeof password}`);
  }

  if (typeof name !== "string") {
    error.push(`name have to string but I got ${typeof name}`);
  }

  if (typeof email !== "string") {
    error.push(`email have to string but I got ${typeof email}`);
  }
  if (error.length === 0) {
    return next();
  }
  return res.status(400).send(error);
};

export const validationTask = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const sanitizeBody: ICreateTask = sanitizeRequest(req.body);
  const title = sanitizeBody.title;
  const date = sanitizeBody.date;
  const desc = sanitizeBody.desc;
  const important = sanitizeBody.important;

  const error: string[] = [];

  if (Object.keys(req.body).length === 0) {
    error.push("body is empty");
  }
  if (!title) {
    error.push("title is required");
  }

  if (!date) {
    error.push("date is required");
  }
  if (!desc) {
    error.push("desc is required");
  }

  if (!important) {
    error.push("important is required");
  }

  if (typeof desc !== "string") {
    error.push(`desc have to string but I got ${typeof desc}`);
  }

  if (typeof title !== "string") {
    error.push(`title have to string but I got ${typeof title}`);
  }

  if (typeof important !== "boolean") {
    error.push(`important have to string but I got ${typeof important}`);
  }

  if (error.length === 0) {
    return next();
  }
  return res.status(400).send(error);
};

export async function middlewareTask(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const ownerId = req.context.userId;
  if (!ownerId) {
    return res.status(401).send({ message: "you are not authontcion" });
  }

  const id = req.params.id;

  const find = await req.db.task.findOne(id);

  if (!find) {
    return res.status(401).send("not found");
  }

  if (String(find?.ownerId) !== ownerId) {
    console.log("owner form data", find?.ownerId);
    console.log("owner from auth", ownerId);

    return res.status(401).send({ message: "you cant" });
  }

  next();
}
