"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, { timestamps: true });
const User = mongoose_1.default.model("User", userSchema);
class UserModel {
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield User.findById(id);
        });
    }
    find() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield User.find();
        });
    }
    update(id, dto) {
        return __awaiter(this, void 0, void 0, function* () {
            dto.name ? { name: dto.name } : {};
            dto.password ? { password: dto.password } : {};
            const update = yield User.findByIdAndUpdate({ id: id }, { $set: { password: dto.password, name: dto.name } }, { new: true });
            return update;
        });
    }
    create(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("hel;;l;;op");
            const model = new User({
                email: dto.email,
                password: dto.password,
                name: dto.name,
            });
            console.log("model", model);
            const user = yield User.create(model);
            return user;
        });
    }
}
exports.UserModel = UserModel;
