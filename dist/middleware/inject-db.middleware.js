"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.injectDbIntoContext = void 0;
const user_model_1 = require("./../model/user.model");
function injectDbIntoContext(req, _res, next) {
    if (req.db) {
        return next();
    }
    req.db = { user: new user_model_1.UserModel() };
    next();
}
exports.injectDbIntoContext = injectDbIntoContext;
