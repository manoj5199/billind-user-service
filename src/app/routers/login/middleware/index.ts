import { NextFunction, Request, Response } from "express";
import { ErrorResponse, RegistrationPayload } from "@type/index";
import { db } from "../../../database";
import bcrypt from "bcrypt";
import { decryptMessage } from "../../../utilities/decrypt";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//-----------------------------

export const validateLoginPayload = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.body) {
    const errorResponse: ErrorResponse = {
      success: false,
      message: "Validation failed.",
      errors: [{ message: "Missing the request body." }],
    };
    return res.status(400).json(errorResponse);
  }
  const { email, password } = req.body as RegistrationPayload;
  // Simple validation to check for missing fields.
  // More complex validation (e.g., email format, password strength) can be added here.
  if (!email || !password) {
    const errorResponse: ErrorResponse = {
      success: false,
      message: "Validation failed.",
      errors: [{ message: "Missing required fields in the request body." }],
    };
    return res.status(400).json(errorResponse);
  }

  if (!emailRegex.test(email)) {
    const errorResponse: ErrorResponse = {
      success: false,
      message: "Validation failed.",
      errors: [{ message: "Enter vaid email address." }],
    };
    return res.status(400).json(errorResponse);
  }

  // If the payload is valid, proceed to the next middleware or route handler.
  next();
};

export const decryptPassword = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { password } = req.body as RegistrationPayload;

    const d_password = decryptMessage(password!);

    req.body.password = d_password;

    next();
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
