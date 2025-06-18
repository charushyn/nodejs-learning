import Movie from "./model.js";
import { sendOkResponse } from "../../responses/sendOkResponse.js";

export const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    sendOkResponse(res, 200, movies);
  } catch (error) {
    sendErrorResponse(res, error, 500);
  }
};

export const createMovie = async (req, res) => {
  try {
    const movie = await Movie.create({
      title: req.body.title,
      rating: req.body.rating,
      year: req.body.year,
    });

    sendOkResponse(res, 201, movie);
  } catch (error) {
    sendErrorResponse(res, error);
  }
};
