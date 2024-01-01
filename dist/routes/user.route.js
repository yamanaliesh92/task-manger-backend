"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const controller_1 = require("../controller");
const updateUser_controller_1 = require("src/controller/updateUser.controller");
const userRouter = express_1.default.Router();
exports.userRouter = userRouter;
userRouter.get("/:id", controller_1.getUsers);
userRouter.post("/", controller_1.createUser);
userRouter.put("/:id", updateUser_controller_1.updateUser);
