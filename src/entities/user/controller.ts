import "dotenv/config";

import { Request, Response } from "express";
import { sendOkResponse } from "../../responses";
import { UserModel, UserType } from "./model";
import { AppError } from "../../utils/types/AppError";
import jwt from "jsonwebtoken";
import createToken from "../../utils/jwt/createToken";

const createUser = async (req: Request, res: Response) => {
  const { email, username, roles, password } = req.body;

  



  const token = createToken({ email: email, hashedPassword: '' });

  const user: UserType = {
    email: email,
    username: username,
    roles: roles,
    token: token,
  };

  const user_response: UserType = await UserModel.create(user);

  sendOkResponse(res, 201, { user_response });
};

const updateUserUsername = async (req: Request, res: Response) => {
  const { id } = req.params;

  

  sendOkResponse(res, 200, {});
};

const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  sendOkResponse(res, 200, {});
};

const authenticateUser = async (req: Request, res: Response) => {
  const authHeader = req.get("Authorization");

  if (!authHeader) {
    throw new AppError("Header problem, missing :", 400);
  }

  console.log(authHeader);

  const decoded_auth_jwt = jwt.decode(authHeader);

  if (typeof decoded_auth_jwt === "string" || decoded_auth_jwt === null) {
    throw new AppError("Bad token", 404);
  }

  const user = await UserModel.findOne({ email: decoded_auth_jwt.email })
    .lean()
    .exec();

  if (user === null) {
    throw new AppError("User is undefined with this email", 404);
  }

  const decoded_auth_user = jwt.decode(user.token);

  console.log(decoded_auth_user);

  if (typeof decoded_auth_user === "string" || decoded_auth_jwt === null) {
    throw new AppError("Bad token", 404);
  }

  if (decoded_auth_user?.password !== decoded_auth_jwt.password) {
    throw new AppError(`Wrong credentials`, 401);
  }

  res.header("Authorization", `${user.token}`);

  sendOkResponse(res, 200, {});
};

export { createUser, authenticateUser, updateUserUsername, deleteUser };
