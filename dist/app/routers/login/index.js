"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middleware_1 = require("./middleware");
const controller_1 = require("./controller");
const router = (0, express_1.Router)();
router.post("/", middleware_1.validateLoginPayload, middleware_1.decryptPassword, controller_1.login);
exports.default = router;
