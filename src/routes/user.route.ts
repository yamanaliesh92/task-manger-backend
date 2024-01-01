import express from "express";

import { createUser, getUsers } from "../controller";
import { updateUser } from "../controller/updateUser.controller";
import { validationUser } from "../middleware/validtion";
import { deleteUser } from "../controller/deleteUser.controller";
import { loginController } from "../controller/login.controller";

const userRouter = express.Router();

userRouter.get("/:id", getUsers);
userRouter.post("/", validationUser, createUser);
userRouter.post("/login", loginController);

userRouter.delete("/:id", deleteUser);
export { userRouter };
