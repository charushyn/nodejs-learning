import express from "express";
import { validateRequest } from "../../utils/middleware/validateRequest";
import { body } from "express-validator";
import { createUser } from "./controller";
import { USER_ROLES } from "./model";
const router = express.Router();

router.post(
  "/",
  body("email").isEmail().withMessage("Email value should be email."),
  body("username")
    .isString()
    .isLength({ min: 2, max: 10 })
    .withMessage("Username should be between 2 a 10 chars"),
  body("roles")
    .isArray({ min: 1 })
    .custom((v) => USER_ROLES.includes(v))
    .withMessage(
      `Avaliable roles (type roles as string[]): ${USER_ROLES.toString()}`
    ),
  body("password")
    .isString()
    .isLength({ min: 6, max: 20 })
    .withMessage("Password should be between 6 a 20 chars"),
  validateRequest,
  createUser
);

export { router as user_router };
