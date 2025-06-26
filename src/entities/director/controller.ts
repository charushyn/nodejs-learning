import { DirectorModel, DirectorType } from "./model";
import { sendOkResponse, sendErrorResponse } from "../../responses";
import { Request, Response } from "express";

export const getDirectors = async (req: Request, res: Response) => {
  const directors_response = await DirectorModel.find();

  sendOkResponse(res, 200, directors_response);
};

export const createDirector = async (req: Request, res: Response) => {
  const director: DirectorType = {
    name: req.body.name,
  };
  const director_response: DirectorType = await DirectorModel.create(director);

  sendOkResponse(res, 201, director_response);
};

export const getDirectorById = async (req: Request, res: Response) => {
  const directorId = req.params.directorId;
  const director_response = await DirectorModel.findById(directorId);

  if (!director_response) {
    throw new Error(`No director was finded by ID:${directorId}`);
  }

  sendOkResponse(res, 200, director_response);
};

export const deleteDirectorById = async (req: Request, res: Response) => {
  const directorId = req.params.directorId;
  const director_response = await DirectorModel.findById(directorId);

  if (!director_response) {
    throw new Error(`No director was finded by ID:${directorId}`);
  }

  sendOkResponse(res, 204, null);
};

export const updateDirectorById = async (req: Request, res: Response) => {
  const directorId: string = req.params.directorId;

  const new_director_data: DirectorType = {
    name: req.body.name,
  };
  const director_response = await DirectorModel.findByIdAndUpdate(
    directorId,
    new_director_data
  );

  if (!director_response) {
    throw new Error(`No director was finded by ID:${directorId}`);
  }

  sendOkResponse(res, 204, director_response);
};
