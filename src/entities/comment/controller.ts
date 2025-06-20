import { CommentModel, CommentType } from "./model";
import { sendOkResponse, sendErrorResponse } from "../../responses";
import { Request, Response } from "express";

export const getComments = async (req: Request, res: Response) => {
  try {
    const comments_response = await CommentModel.find();

    sendOkResponse(res, 200, comments_response);
  } catch (error: unknown) {
    if (error instanceof Error) {
      sendErrorResponse(res, error, 500);
    } else {
      sendErrorResponse(res, new Error("Unknown error"), 500);
    }
  }
};

export const createComment = async (req: Request, res: Response) => {
  try {
    const comment: CommentType = {
      text: req.body.text,
    };
    const comment_response: CommentType = await CommentModel.create(comment);

    sendOkResponse(res, 201, comment_response);
  } catch (error: unknown) {
    if (error instanceof Error) {
      sendErrorResponse(res, error, 500);
    } else {
      sendErrorResponse(res, new Error("Unknown error"), 500);
    }
  }
};

export const getCommentById = async (req: Request, res: Response) => {
  try {
    const commentId = req.params.commentId;
    const comment_response = await CommentModel.findById(commentId);

    if (!comment_response) {
      throw new Error(`No comment was finded by ID:${commentId}`);
    }

    sendOkResponse(res, 200, comment_response);
  } catch (error: unknown) {
    if (error instanceof Error) {
      sendErrorResponse(res, error, 500);
    } else {
      sendErrorResponse(res, new Error("Unknown error"), 500);
    }
  }
};

export const deleteCommentById = async (req: Request, res: Response) => {
  try {
    const commentId = req.params.movieId;
    const comment_response = await CommentModel.findById(commentId);

    if (!comment_response) {
      throw new Error(`No comment was finded by ID:${commentId}`);
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

export const updateCommentById = async (req: Request, res: Response) => {
  try {
    const commentId: string = req.params.commentId;

    const new_comment_data: CommentType = {
      text: req.body.text,
    };
    const comment_response = await CommentModel.findByIdAndUpdate(
      commentId,
      new_comment_data
    );

    if (!comment_response) {
      throw new Error(`No comment was finded by ID:${commentId}`);
    }

    sendOkResponse(res, 204, comment_response);
  } catch (error: unknown) {
    if (error instanceof Error) {
      sendErrorResponse(res, error, 500);
    } else {
      sendErrorResponse(res, new Error("Unknown error"), 500);
    }
  }
};
