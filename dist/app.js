"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const morgan_1 = __importDefault(require("morgan"));
dotenv_1.default.config();
const app = (0, express_1.default)();
//::::::::::::routes:::::::::::::::::::
const movie_route_1 = __importDefault(require("./routes/movie_route"));
const user_route_1 = __importDefault(require("./routes/user_route"));
// import auth from "./routes/auth_route";
mongoose_1.default.connect(process.env.DATABASE_URL, () => {
    console.log("database connected successfully");
});
// :::::::::::::End of Route::::::::::::
// view engine setup
app.set("views", path_1.default.join(process.cwd(), "./src/views"));
app.set("view engine", "ejs");
//middlewares
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static(path_1.default.join(process.cwd(), "./public")));
// app.use("/auth", auth);
app.use("/user", user_route_1.default);
app.use("/movie", movie_route_1.default);
app.get("/", (req, res) => {
    console.log(req.headers);
    res.render("home");
});
const Port = 4000;
app.listen(Port, () => {
    console.log(` server running on http://localhost:${Port}`);
});
exports.default = app;
