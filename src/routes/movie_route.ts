import express from "express";
import {
  createMovie,
  deleteMovie,
  getMovie,
  getMovies,
  updateMovie,
} from "../controllers/movie";
import { Auth } from "../middleware/auth";

const router = express.Router();

router.get("/getmovies", getMovies);
router.post("/getmovies", getMovies);
router.get("/getmovie/:id", getMovie);
router.post("/createmovie", Auth, createMovie);
router.put("/updatemovie/:id", Auth, updateMovie);
router.delete("/deletemovie/:id", Auth, deleteMovie);
router.post("/deletemovie/:id", Auth, deleteMovie);

export default router;
