import { LoginPayload, SuccessResponse } from "@type/index";
import { db } from "../../../database";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const privateKey_ = process.env.PRIVATE_KEY || "";

export const login = async (req: Request, res: Response) => {
  const data = req.body as LoginPayload;
  try {
    const result = await db.collection("users").findOne({ email: data.email });

    if (!result) {
      const errorResponse = {
        success: false,
        message: "User not avaliable",
        errors: [{ message: "Register to Login" }],
      };
      return res.status(204).json(errorResponse);
    }

    const h_password = result.password;
    const isValidPassword = await bcrypt.compare(data.password!, h_password);

    if (!isValidPassword) {
      const errorResponse = {
        success: false,
        message: "Invalid password.",
        errors: [{ message: "Entet valid password." }],
      };
      return res.status(400).json(errorResponse);
    }
    delete result.password;
    var token = jwt.sign(result, privateKey_, {
      expiresIn: 60 * 60,
    });
    const successResponse: SuccessResponse<any> = {
      success: true,
      data: { token },
      message: "Login Success",
    };
    return res.status(200).json(successResponse);
    // TODO:
  } catch (error) {
    const errorResponse = {
      success: false,
      message: "Server error.",
      errors: [{ message: "An unexpected error occurred." }],
    };
    console.log(error);
    res.status(500).json(errorResponse);
  }
};
