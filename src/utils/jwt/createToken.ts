import "dotenv/config";
import { AppError } from "../../utils/types/AppError";
import jwt from "jsonwebtoken";

type CreateTokenProps = {
  email: string;
  hashedPassword: string;
};

export default function createToken({
  email,
  hashedPassword,
}: CreateTokenProps): string {
  if (!process.env.JWT_SECRET) {
    throw new AppError("AUTH CREATE SERICE UNAVALIABLE", 500);
  }

  const signed_token = jwt.sign(
    { email: email, hashedPassword: hashedPassword

     },
    process.env.JWT_SECRET,
  );

  return signed_token;
}
