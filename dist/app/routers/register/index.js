"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middleware_1 = require("./middleware");
const controller_1 = require("./controller");
// import { db } from "@database/index";
const router = (0, express_1.Router)();
router.post("/", middleware_1.validateRegistrationPayload, middleware_1.checkEmailIsAvailable, middleware_1.validatePasswordPolicy, controller_1.register);
exports.default = router;
