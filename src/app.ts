import express from "express";
import path from "path";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import logger from "morgan";
dotenv.config();

const app = express();

//::::::::::::routes:::::::::::::::::::
import userMovie from "./routes/movie_route";
import userRouter from "./routes/user_route";
// import auth from "./routes/auth_route";

mongoose.connect(process.env.DATABASE_URL!, () => {
  console.log("database connected successfully");
});

// :::::::::::::End of Route::::::::::::

// view engine setup
app.set("views", path.join(process.cwd(), "./src/views"));
app.set("view engine", "ejs");

//middlewares
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(process.cwd(), "./public")));

// app.use("/auth", auth);
app.use("/user", userRouter);
app.use("/movie", userMovie);

app.get("/", (req, res) => {
  console.log(req.headers);
  res.render("home");
});

const Port = 4000;

app.listen(Port, () => {
  console.log(` server running on http://localhost:${Port}`);
});

export default app;
