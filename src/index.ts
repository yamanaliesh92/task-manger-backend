import express from "express";
import { config } from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import { userRouter } from "./routes";
import { injectDbIntoContext } from "./middleware/inject-db.middleware";
import { TaskRouter } from "./routes/task.route";

(function main() {
  config();

  mongoose
    .connect(process.env["DB_URL"] as string)
    .then(() => console.log("connected to db"))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });

  const app = express();

  app.use(cors({ origin: "*", allowedHeaders: "*" }));

  app.use(express.json());
  app.use(injectDbIntoContext);

  app.use("/user", userRouter);
  app.use("/task", TaskRouter);

  app.get("/hello", (req, res) => {
    res.send("Express + TypeScript Server");
  });

  console.log("===============");

  app.listen(3001, () => console.log("listening on port 3001"));
})();
