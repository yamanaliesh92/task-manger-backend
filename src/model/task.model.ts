import mongoose from "mongoose";
import { ICreateTask, IUpdateTask } from "./type.model";

const TaskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    desc: { type: String },
    completed: { type: Boolean, required: true, default: false },
    date: { type: Date, required: true },
    ownerId: { type: mongoose.Types.ObjectId },
    important: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", TaskSchema);

export class TaskModel {
  async createTask(dto: ICreateTask, ownerId: string) {
    const model = new Task({
      important: dto.important,
      date: dto.date,
      title: dto.title,
      desc: dto.desc,
      ownerId: ownerId,
    });
    return await Task.create(model);
  }

  async deleteTask(id: string) {
    const d = await Task.deleteOne({ _id: id });
    console.log("d", d);
    return d;
  }

  async findOne(id: string) {
    console.log("id", id);
    const a = await Task.findById({ _id: id });
    console.log("a", a);

    return a;
  }

  async find(ownerId: string) {
    const a = await Task.find({ ownerId: ownerId });
    console.log("a", a);

    return a;
  }

  async update(id: string, dto: IUpdateTask) {
    dto.important ? { important: dto.important } : {};
    dto.date ? { date: dto.title } : {};
    dto.title ? { title: dto.title } : {};
    dto.completed ? { completed: dto.completed } : {};
    dto.desc ? { desc: dto.desc } : {};

    const aa = await Task.updateMany(
      { _id: id },
      {
        $set: {
          important: dto.important,
          title: dto.title,
          date: dto.date,
          desc: dto.desc,
          completed: dto.completed,
        },
      },
      { new: true }
    );

    return aa;
  }
}
