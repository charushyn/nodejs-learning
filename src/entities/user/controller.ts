import "dotenv/config";

import { Request, Response } from "express";
import { sendOkResponse } from "../../responses";
import { UserModel, UserType } from "./model";
import { AppError } from "../../utils/types/AppError";
import jwt from "jsonwebtoken";
import createToken from "../../utils/jwt/createToken";

const createUser = async (req: Request, res: Response) => {
  const { email, username, roles, password } = req.body;

  const token = createToken({ email: email, password: password });

  const user: UserType = {
    email: email,
    username: username,
    roles: roles,
    token: token,
  };

  const user_response: UserType = await UserModel.create(user);

  sendOkResponse(res, 201, { user_response });
};

const authenticateUser = async (req: Request, res: Response) => {
  const authHeader = req.get("Authorization")?.split(":");

  if (!authHeader || !Array.isArray(authHeader)) {
    throw new AppError("Header problem, missing :", 400);
  }

  const header_email = authHeader[0];
  const header_token = authHeader[1];

  const user = await UserModel.findOne({ email: header_email }).lean().exec();

  if (user === null) {
    throw new AppError("User is undefined with this email", 404);
  }

  const decoded_jwt = jwt.decode(user.token);

  console.log(decoded_jwt);

  // if (user.token !== header_token) {
  //   throw new AppError(`Wrong password for: ${header_email}`, 401);
  // }

  // res.header("Authorization", `${user.email}:${user.token}`);

  sendOkResponse(res, 200, { user });
};

export { createUser, authenticateUser };
