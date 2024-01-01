import { Request, Response } from "express";
import { ICreateTask, ICreateUser } from "src/model/type.model";

export async function createUser(req: Request, res: Response) {
  try {
    const body: ICreateUser = req.body;

    const result = await req.db.user.create(body);

    res.status(200).send(result);
  } catch (err) {
    res.status(500).send("some thing wentWrong");
  }
}
