"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../controllers/user");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.get("/create", user_1.Register);
router.get("/login", user_1.Login);
router.post("/create", user_1.Register);
router.post("/login", user_1.Login);
router.get("/dashboard", auth_1.Auth, user_1.dashBoard);
router.get("/*", (req, res, next) => {
    try {
        throw "error";
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
