export interface RegistrationPayload {
  full_name: string;
  email: string;
  password?: string;
  company_name: string;
}

export interface LoginPayload {
  email: string;
  password?: string;
}

// Define the interface for a generic successful response.
export interface SuccessResponse<T> {
  success: true;
  message: string;
  data: T;
  isRegistered?: boolean;
}

// Define the interface for an error detail object.
export interface ErrorDetail {
  field?: string;
  message: string;
}

// Define the interface for an error response.
export interface ErrorResponse {
  success: false;
  message: string;
  isRegistered?: boolean;
  errors?: ErrorDetail[];
}

// A union type that combines both possibilities.
export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;
