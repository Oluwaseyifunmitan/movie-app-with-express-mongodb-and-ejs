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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
const utility_1 = require("../utils/utility");
const Auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let cookie = (_a = req.headers.cookie) === null || _a === void 0 ? void 0 : _a.split("=")[1];
    let user = yield (0, utility_1.extractUser)(cookie);
    if (user) {
        req.user = user;
        next();
    }
    else {
        req.user = null;
        return res.redirect("/user/login");
    }
});
exports.Auth = Auth;
