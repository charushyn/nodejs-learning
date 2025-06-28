import express from "express";
import { validateRequest } from "../../utils/middleware/validateRequest";
import { body, header, param } from "express-validator";
import { authenticateUser, createUser } from "./controller";
import { USER_ROLES, UserModel, UserRole } from "./model";
const router = express.Router();

router.post(
  "/",
  body("email")
    .isEmail()
    .withMessage("Email value should be an email.")
    .custom(async (v) => {
      const user = await UserModel.findOne({ email: v }).lean().exec();
      if (user !== null) {
        return Promise.reject();
      }
      return Promise.resolve();
    })
    .withMessage("User already exist with this email"),
  body("username")
    .isString()
    .isLength({ min: 2, max: 10 })
    .withMessage("Username should be between 2 a 10 chars")
    .custom(async (v) => {
      const user = await UserModel.findOne({ username: v }).lean().exec();
      if (user !== null) {
        return Promise.reject();
      }
      return Promise.resolve();
    })
    .withMessage("User already exist with this username"),
  body("roles")
    .isArray({ min: 1 })
    .custom((v: UserRole[]) => {
      return (
        v.filter((value) => USER_ROLES.includes(value)).length === v.length
      );
    })
    .withMessage(
      `Avaliable roles (type roles as string[]): ${USER_ROLES.toString()}`
    ),
  body("password")
    .isLength({ min: 6, max: 20 })
    .withMessage("Password should be between 6 a 20 chars"),
  validateRequest,
  createUser
);

router.get(
  "/authenticate",
  header("Authorization").notEmpty().withMessage("Auth header missing"),
  validateRequest,
  authenticateUser
);

export { router as user_router };
