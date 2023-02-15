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
exports.deleteMovie = exports.updateMovie = exports.createMovie = exports.getMovies = exports.getMovie = void 0;
const movieModel_1 = __importDefault(require("../models/movieModel"));
const getMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const movie = yield movieModel_1.default.findOne({ _id: id });
        res.status(200).json({ movie, code: 200 });
    }
    catch (err) {
        return res.status(500).json({
            message: "internal server error",
            route: "/movie/getmovie",
        });
    }
});
exports.getMovie = getMovie;
const getMovies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const page: any = req.query.p || 0;
        // const moviePerPage = 5;
        const movies = yield movieModel_1.default.find();
        // .skip(page * moviePerPage)
        // .limit(moviePerPage);
        return res.status(200).render("movies", { movies, code: 200 });
    }
    catch (err) {
        return res.status(500).json({
            message: "internal server error",
            route: "/movie/getmovies",
        });
    }
});
exports.getMovies = getMovies;
const createMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, image, price, id } = req.body;
        const movie = yield movieModel_1.default.findOne({ _id: id });
        if (!movie) {
            const movie = yield movieModel_1.default.create({
                title,
                description,
                image,
                price,
            });
            return res.status(201).json({
                message: "movie successfully created",
                data: movie,
                code: 201,
            });
        }
        return res.status(400).json({ message: "movie already exists" });
    }
    catch (err) {
        return res.status(500).json({
            message: "internal server error",
            route: "/movie/createmovie",
        });
    }
});
exports.createMovie = createMovie;
const updateMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { title, description, image, price } = req.body;
        const movie = yield movieModel_1.default.findByIdAndUpdate({ _id: id });
        console.log;
        if (movie) {
            const movie = yield movieModel_1.default.updateOne({ _id: id }, { title, description, image, price });
            return res.status(200).json({
                message: "movie updated successfully",
                movie,
                code: 200,
            });
        }
        return res.status(400).json({ message: "movie not updated" });
    }
    catch (err) {
        return res.status(500).json({
            message: "internal server error",
            route: "/movie/updatemovie",
        });
    }
});
exports.updateMovie = updateMovie;
const deleteMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const removeMovie = yield movieModel_1.default.findByIdAndDelete({ _id: id });
        return res.status(200).json({ message: "deleted successfully", code: 200 });
    }
    catch (err) {
        return res.status(500).json({
            message: "internal server error",
            route: "/movie/deletemovie",
        });
    }
});
exports.deleteMovie = deleteMovie;
