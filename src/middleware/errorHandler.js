// Global Error Handling
import { ZodError } from "zod";
import { NextResponse } from "next/server";

/**
 * Global error handler for API routes.
 * @param {Error} error - The error object.
 * @returns {NextResponse} - A structured error response.
 */
export function handleApiError(error) {
  console.error("API Error:", error);

  // Handle Zod validation errors
  if (error instanceof ZodError) {
    return NextResponse.json(
      // get the error message
      {
        status: "failed",
        source: "Validation Error",
        message: error.errors,
      },
      { status: 400 }
    );
  }

  // Handle Clerk API errors
  if (error?.errors && Array.isArray(error.errors)) {
    return NextResponse.json(
      {
        status: "failed",
        source: "Clerk API error",
        message: error.errors,
      },
      { status: error.status || 500 }
    );
  }

  // Generic Server Error
  return NextResponse.json(
    {
      message: "Internal Server Error",
      error: error.message || "Unknown error",
    },
    { status: 500 }
  );
}
