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
exports.login = void 0;
const database_1 = require("../../../database");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const privateKey_ = process.env.PRIVATE_KEY || "";
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    try {
        const result = yield database_1.db.collection("users").findOne({ email: data.email });
        if (!result) {
            const errorResponse = {
                success: false,
                message: "User not avaliable",
                errors: [{ message: "Register to Login" }],
            };
            return res.status(204).json(errorResponse);
        }
        const h_password = result.password;
        const isValidPassword = yield bcrypt_1.default.compare(data.password, h_password);
        if (!isValidPassword) {
            const errorResponse = {
                success: false,
                message: "Invalid password.",
                errors: [{ message: "Entet valid password." }],
            };
            return res.status(400).json(errorResponse);
        }
        delete result.password;
        var token = jsonwebtoken_1.default.sign(result, privateKey_, {
            expiresIn: 60 * 60,
        });
        const successResponse = {
            success: true,
            data: { token },
            message: "Login Success",
        };
        return res.status(200).json(successResponse);
        // TODO:
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
});
exports.login = login;
