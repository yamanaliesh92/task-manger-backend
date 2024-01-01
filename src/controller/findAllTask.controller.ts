import { Request, Response, request } from "express";

export async function find(req: Request, res: Response) {
  try {
    const ownerId = req.context?.userId;
    if (typeof ownerId === "undefined") {
      res.status(404).send("ownerId is not exist");
    }

    const result = await req.db.task.find(ownerId);
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send("some thing went wrong");
  }
}
