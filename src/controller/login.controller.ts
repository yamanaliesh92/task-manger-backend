import { Request, Response } from "express";
export async function loginController(req: Request, res: Response) {
  try {
    const body = req.body;
    const result = await req.db.user.login(body);
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send("some thing went wrong");
  }
}
