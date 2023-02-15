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
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../models/userModel"));
// export const isAuthenticated = async (
//   req: JwtPayload,
//   res: Response,
//   next: NextFunction
// ): Promise<void> => {
//   console.log(req.headers);
//   let cookie = req.headers.cookie?.split("=")[1];
//   let user = await extractUser(cookie);
//   if (user) {
//     req.user = user;
//     next();
//   } else {
//     req.user = null;
//     res.redirect("/auth/login");
//   }
//   console.log(user);
//   let user = next();
// };
// function extractUser(cookie: any) {
//   throw new Error("Function not implemented.");
// }
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const authorization = req.headers.authorization;
        if (!authorization) {
            return res.status(401).json({ Error: "kindly login" });
        }
        const token = (_a = req.headers.cookie) === null || _a === void 0 ? void 0 : _a.split("=")[1];
        let verified = jsonwebtoken_1.default.verify(token, process.env.APP_SECRET);
        if (!verified) {
            return res.status(401).json({ Error: "unauthorized" });
        }
        const { id } = verified;
        const user = yield userModel_1.default.findOne({ _id: id });
        if (!user) {
            return res.status(401).json({ Error: "Invalid credentials" });
        }
        req.user = verified;
    }
    catch (err) {
        return res.status(401).json({ Error: "unauthorised" });
    }
});
exports.auth = auth;
