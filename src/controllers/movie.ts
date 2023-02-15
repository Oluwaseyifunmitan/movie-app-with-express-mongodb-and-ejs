import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import movieInstance, { movieAttributes } from "../models/movieModel";

export const getMovie = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const movie = await movieInstance.findOne({ _id: id });
    res.status(200).json({ movie, code: 200 });
  } catch (err) {
    return res.status(500).json({
      message: "internal server error",
      route: "/movie/getmovie",
    });
  }
};
export const getMovies = async (req: Request, res: Response) => {
  try {
    // const page: any = req.query.p || 0;
    // const moviePerPage = 5;
    const movies = await movieInstance.find();
    // .skip(page * moviePerPage)
    // .limit(moviePerPage);
    return res.status(200).render("movies", { movies, code: 200 });
  } catch (err) {
    return res.status(500).json({
      message: "internal server error",
      route: "/movie/getmovies",
    });
  }
};

export const createMovie = async (req: Request, res: Response) => {
  try {
    const { title, description, image, price, id } = req.body;
    const movie = await movieInstance.findOne({ _id: id });
    if (!movie) {
      const movie = await movieInstance.create({
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
  } catch (err) {
    return res.status(500).json({
      message: "internal server error",
      route: "/movie/createmovie",
    });
  }
};
export const updateMovie = async (req: JwtPayload, res: Response) => {
  try {
    const id = req.params.id;
    const { title, description, image, price } = req.body;
    const movie = await movieInstance.findByIdAndUpdate({ _id: id });
    console.log;
    if (movie) {
      const movie = await movieInstance.updateOne(
        { _id: id },
        { title, description, image, price }
      );
      return res.status(200).json({
        message: "movie updated successfully",
        movie,
        code: 200,
      });
    }
    return res.status(400).json({ message: "movie not updated" });
  } catch (err) {
    return res.status(500).json({
      message: "internal server error",
      route: "/movie/updatemovie",
    });
  }
};

export const deleteMovie = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const removeMovie = await movieInstance.findByIdAndDelete({ _id: id });
    return res.status(200).json({ message: "deleted successfully", code: 200 });
  } catch (err) {
    return res.status(500).json({
      message: "internal server error",
      route: "/movie/deletemovie",
    });
  }
};
