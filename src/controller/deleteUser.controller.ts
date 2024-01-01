import { Request, Response } from "express";

export async function deleteUser(req: Request, res: Response) {
  try {
    const id: string = req.params.id;
    await req.db.user.delete(id);
    res.status(200).send("delete is done");
  } catch (err) {
    res.status(500).send("some thing went wrong");
  }
}
