export async function getUnknownErrorMessage(error: unknown) {
  if (error instanceof TypeError) {
    // Network errors, fetch failures
    return {
      error: "Network error - please check your connection",
      status: 503,
    };
  }

  if (error instanceof SyntaxError) {
    // JSON parsing errors
    return { error: "Invalid response format from server", status: 502 };
  }

  // Generic error fallback
  const errorMessage =
    error instanceof Error ? error.message : "Unknown error occurred";

  return { error: `Failed to delete file: ${errorMessage}`, status: 500 };
}
