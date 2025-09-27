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
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const database_1 = require("../../../database");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    try {
        const result = yield database_1.db.collection("users").insertOne(data);
        if (!result.insertedId) {
            const errorResponse = {
                success: false,
                message: "Server error.",
                errors: [{ message: "An unexpected error occurred." }],
            };
            return res.status(500).json(errorResponse);
        }
        delete data.password;
        const successResponse = {
            data: data,
            success: true,
            message: "Registered Successfully!",
            isRegistered: false,
        };
        return res.status(200).json(successResponse);
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
exports.register = register;
