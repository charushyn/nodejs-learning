import { MovieModel, MovieType } from "./model";
import { sendOkResponse, sendErrorResponse } from "../../responses";
import { Request, Response } from "express";

export const getMovies = async (req: Request, res: Response) => {
  try {
    const movies = await MovieModel.find().lean().populate("director");

    sendOkResponse(res, 200, movies);
  } catch (error: unknown) {
    if (error instanceof Error) {
      sendErrorResponse(res, error, 500);
    } else {
      sendErrorResponse(res, new Error("Unknown error"), 500);
    }
  }
};

export const createMovie = async (req: Request, res: Response) => {
  try {
    const movie: MovieType = {
      title: req.body.title,
      rating: req.body.rating,
      year: req.body.year,
      director: req.body.directorId,
    };
    const movie_response: MovieType = await MovieModel.create(movie);

    sendOkResponse(res, 201, movie_response);
  } catch (error: unknown) {
    if (error instanceof Error) {
      sendErrorResponse(res, error, 500);
    } else {
      sendErrorResponse(res, new Error("Unknown error"), 500);
    }
  }
};

export const getMovieById = async (req: Request, res: Response) => {
  try {
    const movie_response = await MovieModel.findById(req.params.movieId);

    if (!movie_response) {
      throw new Error(`No movie was finded by ID:${req.params.movieId}`);
    }

    sendOkResponse(res, 200, movie_response);
  } catch (error: unknown) {
    if (error instanceof Error) {
      sendErrorResponse(res, error, 500);
    } else {
      sendErrorResponse(res, new Error("Unknown error"), 500);
    }
  }
};

export const deleteMovieById = async (req: Request, res: Response) => {
  try {
    const movie = await MovieModel.findById(req.params.movieId);

    if (!movie) {
      throw new Error(`No movie was finded by ID:${req.params.movieId}`);
    }

    sendOkResponse(res, 204, null);
  } catch (error: unknown) {
    if (error instanceof Error) {
      sendErrorResponse(res, error, 500);
    } else {
      sendErrorResponse(res, new Error("Unknown error"), 500);
    }
  }
};

export const updateMovieById = async (req: Request, res: Response) => {
  try {
    const movieId: string = req.params.movieId;

    const new_movie_data: MovieType = {
      title: req.body.title,
      rating: req.body.rating,
      year: req.body.year,
      director: req.body.directorId,
    };
    const movie_response = await MovieModel.findByIdAndUpdate(
      movieId,
      new_movie_data
    );

    if (!movie_response) {
      throw new Error(`No movie was finded by ID:${movieId}`);
    }

    sendOkResponse(res, 204, movie_response);
  } catch (error: unknown) {
    if (error instanceof Error) {
      sendErrorResponse(res, error, 500);
    } else {
      sendErrorResponse(res, new Error("Unknown error"), 500);
    }
  }
};
