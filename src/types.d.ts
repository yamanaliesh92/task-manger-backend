import { UserModel } from "./model";
import { ProductModel } from "./model/type.model";
import { TaskModel } from "./model/task.model";

declare global {
  namespace Express {
    export interface Request {
      db: { user: UserModel; task: TaskModel };
      context: { userId: string };
    }
  }
}
