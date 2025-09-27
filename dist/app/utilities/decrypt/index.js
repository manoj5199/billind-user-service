"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decryptMessage = void 0;
exports.generateKeyPair = generateKeyPair;
// import crypto from "crypto";
const node_forge_1 = __importDefault(require("node-forge"));
const privateKey_ = process.env.PRIVATE_KEY || "";
// export const decryptMessage = (encryptedMessage: string) => {
//   const encryptedDataBuffer = Buffer.from(encryptedMessage, "base64");
//   try {
//     const decryptedData = crypto.privateDecrypt(
//       {
//         key: privateKey,
//         padding: crypto.constants.RSA_PKCS1_OAEP_PADDING, // Or RSA_PKCS1_PADDING
//         oaepHash: "sha256", // Required if using OAEP padding
//       },
//       encryptedDataBuffer
//     );
//     return decryptedData.toString("utf8");
//   } catch (error: any) {
//     console.error("Decryption failed:", error.message);
//   }
// };
/**
 * Generates an RSA key pair.
 * @param {number} bits - The key size in bits. 2048 is a common and secure choice.
 * @returns {object} An object containing the public and private keys in PEM format.
 */
function generateKeyPair(bits = 2048) {
    try {
        console.log(`Generating a ${bits}-bit RSA key pair. This may take a moment...`);
        // Generate the key pair
        const keypair = node_forge_1.default.pki.rsa.generateKeyPair({ bits, e: 0x10001 });
        // Convert keys to PEM format for easy storage and use
        const publicKeyPem = node_forge_1.default.pki.publicKeyToPem(keypair.publicKey);
        const privateKeyPem = node_forge_1.default.pki.privateKeyToPem(keypair.privateKey);
        return { publicKeyPem, privateKeyPem };
    }
    catch (error) {
        console.error("An error occurred during key generation:", error.message);
        return null;
    }
}
const decryptMessage = (encryptedMessage) => {
    try {
        // 1. Parse the PEM-formatted private key
        const privateKey = node_forge_1.default.pki.privateKeyFromPem(privateKey_);
        // 2. Decode the base64-encoded encrypted data
        const encryptedData = node_forge_1.default.util.decode64(encryptedMessage);
        // 3. Decrypt the data using RSA-OAEP with SHA-256 hash.
        // The padding and hash algorithm MUST match the encryption process.
        const decryptedData = privateKey.decrypt(encryptedData, "RSA-OAEP", {
            md: node_forge_1.default.md.sha256.create(),
            mgf1: { md: node_forge_1.default.md.sha256.create() },
        });
        // 4. Convert the decrypted buffer back to a UTF-8 string
        const decryptedMessage = node_forge_1.default.util.decodeUtf8(decryptedData);
        return decryptedMessage;
    }
    catch (error) {
        console.error("Decryption Error:", error.message);
        throw error;
    }
};
exports.decryptMessage = decryptMessage;
