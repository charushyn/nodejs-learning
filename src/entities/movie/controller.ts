import { MovieModel, MovieType } from "./model";
import { sendOkResponse, sendErrorResponse } from "../../responses";
import { Request, Response } from "express";
import mongoose from "mongoose";
import isObjectEmpty from "../../utils/methods/isObjectEmpty";
import NodeCache from "node-cache";
import getMovieCache from "../../utils/cache/getMovieCache";

const cache = new NodeCache();

export const getMovies = async (req: Request, res: Response) => {
  const { title, sort } = req.query;

  let response;

  const query = MovieModel.find();

  if (title) {
    query.where("title").equals(title);
  }

  if (sort) {
    query.sort({ year: -1 });
  }

  if (isObjectEmpty({ ...req.query })) {
    response = await getMovieCache(query, cache);
  } else {
    response = await query.lean().populate("director").exec();
  }

  sendOkResponse(res, 200, { response });
};

export const createMovie = async (req: Request, res: Response) => {
  const movie: MovieType = {
    title: req.body.title,
    rating: req.body.rating,
    year: req.body.year,
    director: req.body.directorId,
  };
  const movie_response: MovieType = await MovieModel.create(movie);

  sendOkResponse(res, 201, movie_response);
};

export const getMovieById = async (req: Request, res: Response) => {
  const movie_response = await MovieModel.findById(req.params.movieId).exec();

  if (!movie_response) {
    throw new Error(`No movie was finded by ID:${req.params.movieId}`);
  }

  sendOkResponse(res, 200, movie_response);
};

export const deleteMovieById = async (req: Request, res: Response) => {
  const movie = await MovieModel.findById(req.params.movieId);

  if (!movie) {
    throw new Error(`No movie was finded by ID:${req.params.movieId}`);
  }

  sendOkResponse(res, 204, null);
};

export const updateMovieById = async (req: Request, res: Response) => {
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
};

export const testFn = async (req: Request, res: Response) => {
  const directorId: string = req.body.directorId;

  const aggregate = await MovieModel.aggregate([
    {
      $match: { director: new mongoose.Types.ObjectId(directorId) },
    },
  ]);

  sendOkResponse(res, 200, aggregate);
};

export const testFnSecond = async (req: Request, res: Response) => {
  const aggregate = await MovieModel.aggregate([
    {
      $match: {
        year: {
          $gte: 1999,
          $lt: 2010,
        },
      },
    },
  ]);

  sendOkResponse(res, 200, aggregate);
};
