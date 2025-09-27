"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.encryptMessage = void 0;
const crypto_1 = __importDefault(require("crypto"));
const encryptMessage = (message) => {
    // 1. Replace with your actual public key in PEM format
    const publicKey = process.env.PUBLIC_KEY || "";
    const dataToEncrypt = Buffer.from(message);
    try {
        const encryptedData = crypto_1.default.publicEncrypt({
            key: publicKey,
            padding: crypto_1.default.constants.RSA_PKCS1_OAEP_PADDING, // Recommended padding for security
            oaepHash: "sha256", // Hash algorithm for OAEP padding
        }, dataToEncrypt);
        return encryptedData.toString("base64");
    }
    catch (error) {
        console.error("Encryption Error:", error.message);
    }
};
exports.encryptMessage = encryptMessage;
