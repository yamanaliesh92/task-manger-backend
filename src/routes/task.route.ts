import { Router } from "express";
import { validateToken } from "../middleware/jwt";
import { middlewareTask, validationTask } from "../middleware/validtion";
import { createTaskController } from "../controller/createTask.controller";
import { Delete } from "../controller/deleteTask.controller";
import { updateTask } from "../controller/updateTask.controller";
import { find } from "../controller/findAllTask.controller";

export const TaskRouter = Router();

TaskRouter.post("/", validateToken, createTaskController);

TaskRouter.delete("/:id", validateToken, middlewareTask, Delete);

TaskRouter.get("/all", validateToken, find);

TaskRouter.patch("/:id", validateToken, middlewareTask, updateTask);
