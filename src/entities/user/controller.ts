import { Request, Response } from "express";
import { sendOkResponse } from "../../responses";

const createUser = async (req: Request, res: Response) => {
  sendOkResponse(res, 200, {});
};

export { createUser };
