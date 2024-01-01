"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const mongoose_1 = __importDefault(require("mongoose"));
const routes_1 = require("./routes");
const inject_db_middleware_1 = require("./middleware/inject-db.middleware");
(function main() {
    (0, dotenv_1.config)();
    mongoose_1.default
        .connect(process.env["DB_URL"])
        .then(() => console.log("connected to db"))
        .catch((err) => {
        console.error(err);
        process.exit(1);
    });
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use(inject_db_middleware_1.injectDbIntoContext);
    app.use("/user", routes_1.userRouter);
    app.get("/hello", (req, res) => {
        res.send("Express + TypeScript Server");
    });
    console.log("===============");
    app.listen(3001, () => console.log("listening on port 3001"));
})();
