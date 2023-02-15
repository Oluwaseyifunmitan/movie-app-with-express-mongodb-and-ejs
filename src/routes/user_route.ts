import express from "express";

import { dashBoard, Login, Register } from "../controllers/user";
import { Auth } from "../middleware/auth";

const router = express.Router();

router.get("/create", Register);
router.get("/login", Login);
router.post("/create", Register);
router.post("/login", Login);
router.get("/dashboard", Auth, dashBoard);

router.get("/*", (req, res, next) => {
  try {
    throw "error";
  } catch (error) {
    next(error);
  }
});
export default router;
