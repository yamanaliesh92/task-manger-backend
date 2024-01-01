import mongoose from "mongoose";
import { IPayload, sign } from "../middleware/jwt";
import { ICreateUser, IPayloadLogin, IUpdateUser } from "./type.model";

const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    img: { type: String },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export class UserModel {
  async delete(id: string) {
    return await User.findByIdAndDelete({ id: id });
  }
  async findOne(id: string) {
    return await User.findById(id);
  }
  async find() {
    return await User.find();
  }

  async update(id: string, dto: IUpdateUser) {
    dto.name ? { name: dto.name } : {};
    dto.password ? { password: dto.password } : {};

    const update = await User.findByIdAndUpdate(
      { id: id },
      { $set: { password: dto.password, name: dto.name } },
      { new: true }
    );
    return update;
  }

  async login(dto: IPayloadLogin) {
    const find = await User.findOne({ email: dto.email });
    if (!find) {
      return "email or password is not correct try again please ...";
    }

    if (find.password !== dto.password) {
      return "email or password is not correct try again please ...";
    }
    const payload: IPayload = {
      _id: find.id,
    };
    const token = sign(payload);
    return { token: token, user: find };
  }

  async create(dto: ICreateUser) {
    console.log("data");
    const model = new User({
      email: dto.email,
      password: dto.password,
      name: dto.name,
    });

    const user = await User.create(model);

    return { user: user };
  }
}
