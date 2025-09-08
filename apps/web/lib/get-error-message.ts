export async function getErrorMessage(
  response: Response,
): Promise<string | null> {
  let errorMessage: string | null = null;

  switch (response.status) {
    case 404:
      errorMessage = "File not found";
      break;
    case 403:
      errorMessage = "Access denied - insufficient permissions";
      break;
    case 409:
      errorMessage = "File cannot be deleted - it may be in use";
      break;
    case 429:
      errorMessage = "Rate limit exceeded - please try again later";
      break;
    case 500:
      errorMessage = "Server error - please try again later";
      break;
    default:
      try {
        const errorData = await response.json();
        if (errorData.message) {
          errorMessage = errorData.message;
        }
      } catch {
        errorMessage = `Request failed with unknown error.`;
      }
  }

  return errorMessage;
}
