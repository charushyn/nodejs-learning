import { Schema, model, Types } from "mongoose";

type UserRole = "user" | "admin";

const USER_ROLES: UserRole[] = ["user", "admin"];

interface UserType {
  email: string;
  username: string;
  roles: UserRole[];
  password: string;
}

const UserSchema = new Schema<UserType>({
  email: { type: String, required: true },
  username: { type: String, required: true },
  roles: { type: [String], required: true },
  password: { type: String, required: true },
});

const UserModel = model<UserType>("User", UserSchema, "users");

export { UserType, UserModel, USER_ROLES };
