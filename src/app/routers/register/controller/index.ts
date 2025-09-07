import { RegistrationPayload, SuccessResponse } from "@type/index";
import { db } from "../../../database";
import { Request, Response } from "express";

export const register = async (req: Request, res: Response) => {
  const data = req.body as RegistrationPayload;
  try {
    const result = await db.collection("users").insertOne(data);

    if (!result.insertedId) {
      const errorResponse = {
        success: false,
        message: "Server error.",
        errors: [{ message: "An unexpected error occurred." }],
      };
      return res.status(500).json(errorResponse);
    }

    delete data.password;

    const successResponse: SuccessResponse<RegistrationPayload> = {
      data: data,
      success: true,
      message: "Registered Successfully!",
      isRegistered: false,
    };
    return res.status(200).json(successResponse);
  } catch (error) {
    const errorResponse = {
      success: false,
      message: "Server error.",
      errors: [{ message: "An unexpected error occurred." }],
    };
    res.status(500).json(errorResponse);
  }
};
