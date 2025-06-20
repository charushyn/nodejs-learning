import { DirectorModel, DirectorType } from "./model";
import { sendOkResponse, sendErrorResponse } from "../../responses";
import { Request, Response } from "express";

export const getDirectors = async (req: Request, res: Response) => {
  try {
    const directors_response = await DirectorModel.find();

    sendOkResponse(res, 200, directors_response);
  } catch (error: unknown) {
    if (error instanceof Error) {
      sendErrorResponse(res, error, 500);
    } else {
      sendErrorResponse(res, new Error("Unknown error"), 500);
    }
  }
};

export const createDirector = async (req: Request, res: Response) => {
  try {
    const director: DirectorType = {
      name: req.body.name,
    };
    const director_response: DirectorType =
      await DirectorModel.create(director);

    sendOkResponse(res, 201, director_response);
  } catch (error: unknown) {
    if (error instanceof Error) {
      sendErrorResponse(res, error, 500);
    } else {
      sendErrorResponse(res, new Error("Unknown error"), 500);
    }
  }
};

export const getDirectorById = async (req: Request, res: Response) => {
  try {
    const directorId = req.params.directorId;
    const director_response = await DirectorModel.findById(directorId);

    if (!director_response) {
      throw new Error(`No director was finded by ID:${directorId}`);
    }

    sendOkResponse(res, 200, director_response);
  } catch (error: unknown) {
    if (error instanceof Error) {
      sendErrorResponse(res, error, 500);
    } else {
      sendErrorResponse(res, new Error("Unknown error"), 500);
    }
  }
};

export const deleteDirectorById = async (req: Request, res: Response) => {
  try {
    const directorId = req.params.directorId;
    const director_response = await DirectorModel.findById(directorId);

    if (!director_response) {
      throw new Error(`No director was finded by ID:${directorId}`);
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

export const updateDirectorById = async (req: Request, res: Response) => {
  try {
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
  } catch (error: unknown) {
    if (error instanceof Error) {
      sendErrorResponse(res, error, 500);
    } else {
      sendErrorResponse(res, new Error("Unknown error"), 500);
    }
  }
};
