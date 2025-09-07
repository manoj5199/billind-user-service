import { Router } from "express";
import { decryptPassword, validateLoginPayload } from "./middleware";
import { login } from "./controller";

const router = Router();

router.post("/", validateLoginPayload, decryptPassword, login);

export default router;
