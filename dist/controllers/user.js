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
exports.dashBoard = exports.Login = exports.Register = void 0;
const utility_1 = require("../utils/utility");
const userModel_1 = __importDefault(require("../models/userModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const movieModel_1 = __importDefault(require("../models/movieModel"));
const Register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.method === "GET") {
        return res.render("Register");
    }
    else {
        try {
            const { firstname, lastname, email, password } = req.body;
            const validateUser = utility_1.registerSchema.validate(req.body, utility_1.option);
            if (validateUser.error) {
                res.status(400).json({ Error: validateUser.error.details[0].message });
            }
            const salt = yield (0, utility_1.GenerateSalt)();
            const userPassword = yield (0, utility_1.GeneratePassword)(password, salt);
            const user = yield userModel_1.default.findOne({ email });
            if (!user) {
                const user = yield userModel_1.default.create({
                    firstname,
                    lastname,
                    email,
                    password: userPassword,
                });
                return res.status(201).json({
                    message: "User created successfully",
                    user,
                    code: 201,
                });
            }
            return res.status(400).json({ message: "user already exists" });
        }
        catch (err) {
            res.status(500).json({
                Error: "internal sever error",
                route: "/user/create",
            });
        }
    }
});
exports.Register = Register;
const Login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.method === "GET") {
        return res.render("Login");
    }
    else {
        try {
            const { email, password } = req.body;
            const validateUser = utility_1.loginSchema.validate(req.body, utility_1.option);
            if (validateUser.error) {
                return res.status(400).json({
                    Error: validateUser.error.details[0].message,
                });
            }
            const user = (yield userModel_1.default.findOne({
                email,
            }));
            if (user) {
                const validate = yield bcrypt_1.default.compare(password, user.password);
                if (validate) {
                    const token = yield (0, utility_1.GetToken)(`${user._id}`);
                    res.cookie("token", token);
                    return res
                        .status(201)
                        .json({ message: "user loggedin successfully", code: 201 });
                }
                return res.status(400).json({ message: "wrong username or password" });
            }
        }
        catch (err) {
            res.status(500).json({
                Error: "internal sever error",
                route: "/user/login",
            });
        }
    }
});
exports.Login = Login;
const dashBoard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = req.user;
        if (_id) {
            const data = yield userModel_1.default.findOne({ _id });
            const movies = yield movieModel_1.default.find();
            return res.status(201).render("dashboard", { data, movies, code: 201 });
        }
        else {
            return res.status(400).json({ message: "no access" });
        }
    }
    catch (error) {
        res.status(500).json({
            Error: "internal sever error",
            route: "/user/dashboard",
        });
    }
});
exports.dashBoard = dashBoard;
