"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const movie_1 = require("../controllers/movie");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.get("/getmovies", movie_1.getMovies);
router.post("/getmovies", movie_1.getMovies);
router.get("/getmovie/:id", movie_1.getMovie);
router.post("/createmovie", auth_1.Auth, movie_1.createMovie);
router.put("/updatemovie/:id", auth_1.Auth, movie_1.updateMovie);
router.delete("/deletemovie/:id", auth_1.Auth, movie_1.deleteMovie);
router.post("/deletemovie/:id", auth_1.Auth, movie_1.deleteMovie);
exports.default = router;
