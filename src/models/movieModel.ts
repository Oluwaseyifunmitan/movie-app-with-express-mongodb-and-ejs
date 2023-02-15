import mongoose, { Schema } from "mongoose";

export interface movieAttributes {
  push(movies: movieAttributes): void;
  title: string;
  description: string;
  image: string;
  price: number;
  _id?: string;
}

const movieSchema = new Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
    price: {
      type: String,
    },
  },
  { timestamps: true }
);

const movieInstance = mongoose.model<movieAttributes>("Movie", movieSchema);

export default movieInstance;
