"use strict";
// import { Request, Response } from "express";
// export const Login = async (req: Request, res: Response) => {
//   if (req.method === "GET") {
//     return res.render("Login");
//   } else {
//     const { email, password } = req.body;
//     const loggedIn: any = users.filter((user: any) => user.email == email);
//     if (loggedIn.length > 0) {
//       let hash = await genPassword(password);
//       let _id = loggedIn[0]._id;
//       if (hash == loggedIn[0].password) {
//         let token = await genToken({ email: email, _id: _id });
//         res.cookie("token", token); // set a cookie during login
//         return res
//           .status(200)
//           .json({ code: 200, message: "you have successfully logged in" });
//       } else {
//         return res.status(400).json({ code: 400, message: "not logged in" });
//       }
//     } else {
//       return res.send("no user with this account");
//     }
//   }
// };
// export const Register = async (req: Request, res: Response) => {
//   if (req.method === "GET") {
//     return res.render("Register");
//   } else {
//     //validate input with joi
//     try {
//       const { password, email } = req.body;
// const salt = await GenerateSalt();
//       const userPassword = await GeneratePassword(password,salt);
//       req.body.password = hash;
//       const registeredUser = await userInstance.create({email:email})
//       if (registeredUser.length > 0) {
//         res.status(400).json({ code: 400, message: "user exists" });
//       } else {
//         let user = req.body;
//         let _id = new generateId().gen();
//         user._id = _id;
//         user.Movies = [];
//         users.push(user);
//         saveFile(users);
//         // genearate Id for users
//         let token = await genToken({ email: email, _id: _id });
//         res.cookie("token", token);
//         return res.status(201).json({ code: 201, message: "please login" });
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }
// };
// export const Logout = async (req: Request, res: Response) => {
//   req.headers.cookie = "";
//   res.clearCookie("token");
//   res.setHeader("authorization", [""]);
//   req.headers.authorization = "";
//   res.redirect("/");
// };
