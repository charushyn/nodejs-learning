import { Response } from "express";

const sendErrorResponse = async (
  res: Response,
  error: Error,
  status: number
) => {
  res.status(status ? status : 500).end(error.message);
};

export { sendErrorResponse };
