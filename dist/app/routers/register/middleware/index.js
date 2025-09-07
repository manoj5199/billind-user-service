"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePasswordPolicy = exports.checkEmailIsAvailable = exports.validateRegistrationPayload = void 0;
const database_1 = require("../../../database");
const bcrypt_1 = __importDefault(require("bcrypt"));
const decrypt_1 = require("../../../utilities/decrypt");
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const validatePassword = (password) => {
    const errors = [];
    // Rule 1: Minimum length of 8 characters
    if (password.length < 8) {
        errors.push("Password must be at least 8 characters long.");
    }
    // Rule 2: At least one uppercase letter
    if (!/[A-Z]/.test(password)) {
        errors.push("Password must contain at least one uppercase letter.");
    }
    // Rule 3: At least one lowercase letter
    if (!/[a-z]/.test(password)) {
        errors.push("Password must contain at least one lowercase letter.");
    }
    // Rule 4: At least one number
    if (!/[0-9]/.test(password)) {
        errors.push("Password must contain at least one number.");
    }
    // Rule 5: At least one special character
    if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
        errors.push("Password must contain at least one special character.");
    }
    return {
        isValid: errors.length === 0,
        errors,
    };
};
const validateRegistrationPayload = (req, res, next) => {
    if (!req.body) {
        const errorResponse = {
            success: false,
            message: "Validation failed.",
            errors: [{ message: "Missing the request body." }],
        };
        return res.status(400).json(errorResponse);
    }
    const { full_name, email, password, company_name } = req.body;
    // Simple validation to check for missing fields.
    // More complex validation (e.g., email format, password strength) can be added here.
    if (!full_name || !email || !password || !company_name) {
        const errorResponse = {
            success: false,
            message: "Validation failed.",
            errors: [{ message: "Missing required fields in the request body." }],
        };
        return res.status(400).json(errorResponse);
    }
    // If the payload is valid, proceed to the next middleware or route handler.
    next();
};
exports.validateRegistrationPayload = validateRegistrationPayload;
const checkEmailIsAvailable = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        if (!emailRegex.test(email)) {
            const errorResponse = {
                success: false,
                isRegistered: true,
                message: "Validation failed.",
                errors: [{ message: "This email is not valid." }],
            };
            return res.status(200).json(errorResponse);
        }
        // Use findOne to check for a document with a matching email
        const user = yield database_1.db.collection("users").findOne({ email });
        if (user) {
            const errorResponse = {
                success: false,
                isRegistered: true,
                message: "Validation failed.",
                errors: [{ message: "This email is already registered." }],
            };
            return res.status(200).json(errorResponse);
        }
        next();
    }
    catch (error) {
        const errorResponse = {
            success: false,
            message: "Server error.",
            errors: [{ message: "An unexpected error occurred." }],
        };
        res.status(500).json(errorResponse);
    }
});
exports.checkEmailIsAvailable = checkEmailIsAvailable;
const validatePasswordPolicy = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { password } = req.body;
        const d_password = (0, decrypt_1.decryptMessage)(password);
        // Validate password policy first
        const passwordCheck = validatePassword(d_password);
        if (!passwordCheck.isValid) {
            return res.status(400).json({
                success: false,
                message: "Password does not meet policy requirements.",
                errors: passwordCheck.errors.map((msg) => ({ message: msg })),
            });
        }
        const hashedPassword = bcrypt_1.default.hashSync(d_password, 12);
        req.body.password = hashedPassword;
        next();
    }
    catch (error) {
        const errorResponse = {
            success: false,
            message: "Server error.",
            errors: [{ message: "An unexpected error occurred." }],
        };
        res.status(500).json(errorResponse);
    }
});
exports.validatePasswordPolicy = validatePasswordPolicy;
