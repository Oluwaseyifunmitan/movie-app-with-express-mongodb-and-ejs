import express, { Request, Response } from "express";
import {
  registerSchema,
  option,
  GenerateSalt,
  GeneratePassword,
  loginSchema,
  GetToken,
} from "../utils/utility";
import userInstance, { userAttributes } from "../models/userModel";
import bcrypt from "bcrypt";
import { JwtPayload } from "jsonwebtoken";
import movieInstance from "../models/movieModel";

export const Register = async (req: Request, res: Response) => {
  if (req.method === "GET") {
    return res.render("Register");
  } else {
    try {
      const { firstname, lastname, email, password } = req.body;
      const validateUser = registerSchema.validate(req.body, option);
      if (validateUser.error) {
        res.status(400).json({ Error: validateUser.error.details[0].message });
      }
      const salt = await GenerateSalt();
      const userPassword = await GeneratePassword(password, salt);
      const user = await userInstance.findOne({ email });
      if (!user) {
        const user = await userInstance.create({
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
    } catch (err) {
      res.status(500).json({
        Error: "internal sever error",
        route: "/user/create",
      });
    }
  }
};

export const Login = async (req: Request, res: Response) => {
  if (req.method === "GET") {
    return res.render("Login");
  } else {
    try {
      const { email, password } = req.body;
      const validateUser = loginSchema.validate(req.body, option);
      if (validateUser.error) {
        return res.status(400).json({
          Error: validateUser.error.details[0].message,
        });
      }
      const user = (await userInstance.findOne({
        email,
      })) as unknown as userAttributes;
      if (user) {
        const validate = await bcrypt.compare(password, user.password);
        if (validate) {
          const token = await GetToken(`${user._id}`);
          res.cookie("token", token);
          return res
            .status(201)
            .json({ message: "user loggedin successfully", code: 201 });
        }
        return res.status(400).json({ message: "wrong username or password" });
      }
    } catch (err) {
      res.status(500).json({
        Error: "internal sever error",
        route: "/user/login",
      });
    }
  }
};

export const dashBoard = async (req: JwtPayload, res: Response) => {
  try {
    const { _id } = req.user;
    if (_id) {
      const data = await userInstance.findOne({ _id });
      const movies = await movieInstance.find();
      return res.status(201).render("dashboard", { data, movies, code: 201 });
    } else {
      return res.status(400).json({ message: "no access" });
    }
  } catch (error) {
    res.status(500).json({
      Error: "internal sever error",
      route: "/user/dashboard",
    });
  }
};
