import { Request, Response } from "express";

export async function getUsers(req: Request, res: Response) {
  try {
    const id: string = req.params.id;
    const user = await req.db.user.findOne(id);

    res.status(200).send(user);
  } catch (err) {
    res.status(500).send("some thing went wrong");
  }
}
