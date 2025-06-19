import Movie from "./model";
import { sendOkResponse, sendErrorResponse } from "../../responses";
import { Request, Response } from "express";

export const getMovies = async (req: Request, res: Response) => {
  try {
    const movies = await Movie.find();
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
    const movie = await Movie.create({
      title: req.body.title,
      rating: req.body.rating,
      year: req.body.year,
    });

    sendOkResponse(res, 201, movie);
  } catch (error: unknown) {
    if (error instanceof Error) {
      sendErrorResponse(res, error, 500);
    } else {
      sendErrorResponse(res, new Error("Unknown error"), 500);
    }
  }
};
