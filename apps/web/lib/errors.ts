/**
 * A custom error object with a status and optional info fields
 * Extends the Error object for easier HTTP error handling
 */
export class FetchError extends Error {
  status: number;
  info?: unknown;

  constructor(message: string, status: number, info?: unknown) {
    super(message);
    this.name = "FetchError";
    this.status = status;
    this.info = info;
  }
}
