"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decryptPassword = exports.validateLoginPayload = void 0;
const decrypt_1 = require("../../../utilities/decrypt");
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//-----------------------------
const validateLoginPayload = (req, res, next) => {
    if (!req.body) {
        const errorResponse = {
            success: false,
            message: "Validation failed.",
            errors: [{ message: "Missing the request body." }],
        };
        return res.status(400).json(errorResponse);
    }
    const { email, password } = req.body;
    // Simple validation to check for missing fields.
    // More complex validation (e.g., email format, password strength) can be added here.
    if (!email || !password) {
        const errorResponse = {
            success: false,
            message: "Validation failed.",
            errors: [{ message: "Missing required fields in the request body." }],
        };
        return res.status(400).json(errorResponse);
    }
    if (!emailRegex.test(email)) {
        const errorResponse = {
            success: false,
            message: "Validation failed.",
            errors: [{ message: "Enter vaid email address." }],
        };
        return res.status(400).json(errorResponse);
    }
    // If the payload is valid, proceed to the next middleware or route handler.
    next();
};
exports.validateLoginPayload = validateLoginPayload;
const decryptPassword = (req, res, next) => {
    try {
        const { password } = req.body;
        const d_password = (0, decrypt_1.decryptMessage)(password);
        req.body.password = d_password;
        next();
    }
    catch (error) {
        const errorResponse = {
            success: false,
            message: "Server error.",
            errors: [{ message: "An unexpected error occurred." }],
        };
        console.log(error);
        res.status(500).json(errorResponse);
    }
};
exports.decryptPassword = decryptPassword;
