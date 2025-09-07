import crypto from "crypto";
export const encryptMessage = (message: string) => {
  // 1. Replace with your actual public key in PEM format
  const publicKey = process.env.PUBLIC_KEY || "";

  const dataToEncrypt = Buffer.from(message);

  try {
    const encryptedData = crypto.publicEncrypt(
      {
        key: publicKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING, // Recommended padding for security
        oaepHash: "sha256", // Hash algorithm for OAEP padding
      },
      dataToEncrypt
    );

    return encryptedData.toString("base64");
  } catch (error: any) {
    console.error("Encryption Error:", error.message);
  }
};
