import { Request, Response } from "express";

export async function updateTask(req: Request, res: Response) {
  try {
    const id = req.params.id;

    const body = req.body;

    await req.db.task.update(id, body);
    res.status(200).send("update is done");
  } catch (Err) {
    res.status(500).send("some thing went wrong");
  }
}
