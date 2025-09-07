import { NextFunction, Request, Response } from "express";
import { ErrorResponse, RegistrationPayload } from "@type/index";
import { db } from "../../../database";
import bcrypt from "bcrypt";
import { decryptMessage } from "../../../utilities/decrypt";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validatePassword = (password: string) => {
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

export const validateRegistrationPayload = (
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
  const { full_name, email, password, company_name } =
    req.body as RegistrationPayload;
  console.log(password);
  // Simple validation to check for missing fields.
  // More complex validation (e.g., email format, password strength) can be added here.
  if (!full_name || !email || !password || !company_name) {
    const errorResponse: ErrorResponse = {
      success: false,
      message: "Validation failed.",
      errors: [{ message: "Missing required fields in the request body." }],
    };
    return res.status(400).json(errorResponse);
  }

  // If the payload is valid, proceed to the next middleware or route handler.
  next();
};

export const checkEmailIsAvailable = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body as RegistrationPayload;

    if (!emailRegex.test(email)) {
      const errorResponse: ErrorResponse = {
        success: false,
        isRegistered: true,
        message: "Validation failed.",
        errors: [{ message: "This email is not valid." }],
      };
      return res.status(200).json(errorResponse);
    }

    // Use findOne to check for a document with a matching email
    const user = await db.collection("users").findOne({ email });

    if (user) {
      const errorResponse: ErrorResponse = {
        success: false,
        isRegistered: true,
        message: "Validation failed.",
        errors: [{ message: "This email is already registered." }],
      };
      return res.status(200).json(errorResponse);
    }

    next();
  } catch (error) {
    const errorResponse = {
      success: false,
      message: "Server error.",
      errors: [{ message: "An unexpected error occurred." }],
    };
    res.status(500).json(errorResponse);
  }
};

export const validatePasswordPolicy = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { password } = req.body as RegistrationPayload;
    const d_password = decryptMessage(password!);

    // Validate password policy first
    const passwordCheck = validatePassword(d_password!);

    if (!passwordCheck.isValid) {
      return res.status(400).json({
        success: false,
        message: "Password does not meet policy requirements.",
        errors: passwordCheck.errors.map((msg) => ({ message: msg })),
      });
    }
    const hashedPassword = bcrypt.hashSync(d_password!, 12);
    req.body.password = hashedPassword;
    next();
  } catch (error) {
    const errorResponse = {
      success: false,
      message: "Server error.",
      errors: [{ message: "An unexpected error occurred." }],
    };
    res.status(500).json(errorResponse);
  }
};
