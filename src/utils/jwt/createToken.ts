import "dotenv/config";
import { AppError } from "../../utils/types/AppError";
import jwt from "jsonwebtoken";

type CreateTokenProps = {
  email: string;
  password: string;
};

export default function createToken({
  email,
  password,
}: CreateTokenProps): string {
  if (!process.env.JWT_SECRET) {
    throw new AppError("AUTH CREATE SERICE UNAVALIABLE", 500);
  }

  const signed_token = jwt.sign(
    { email: email, password: password },
    process.env.JWT_SECRET
  );

  return signed_token;
}
