import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
const SECRET_TOKEN = "aabbaaabbbasssassssfffasa";
const TOKEN_HEADERS = "auth";
export interface IPayload {
  _id: string;
}

export function sign(payload: IPayload) {
  return jwt.sign(payload, SECRET_TOKEN);
}

export async function validateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.headers[TOKEN_HEADERS] as string;
    if (!token) {
      res.status(404).send("not authentication");
    }
    const decode: IPayload = jwt.decode(token) as IPayload;
    if (!decode) {
      res.status(404).send("failed in decode");
    }

    req.context = { ...req.context, userId: decode._id };

    next();
  } catch (err) {
    console.log("error occurred in validateToken", err);
    res.status(500).send({ message: "some thing went wrong" });
  }
}
