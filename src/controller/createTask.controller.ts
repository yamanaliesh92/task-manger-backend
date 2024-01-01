import { Request, Response } from "express";
import { ICreateTask } from "src/model/type.model";
export async function createTaskController(req: Request, res: Response) {
  try {
    const userId = req.context?.userId;
    if (typeof userId === "undefined") {
      res.status(404).send("userId is not exist");
    }
    const body: ICreateTask = req.body;

    const result = await req.db.task.createTask(body, userId);
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send("some thing went wrong");
  }
}
