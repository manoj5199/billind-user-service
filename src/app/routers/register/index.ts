import { Router } from "express";
import {
  checkEmailIsAvailable,
  validatePasswordPolicy,
  validateRegistrationPayload,
} from "./middleware";
// import { db } from "src/app/database";
import { db } from "../../database";
import { ObjectId } from "mongodb";
import { register } from "./controller";
// import { db } from "@database/index";

const router = Router();

router.post(
  "/",
  validateRegistrationPayload,
  checkEmailIsAvailable,
  validatePasswordPolicy,
  register
);

export default router;
