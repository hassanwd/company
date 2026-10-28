/** Expected failures whose message is safe to show to the user. Anything else is hidden as a generic error. */
export class AppError extends Error {
  constructor(
    public readonly code: string,
    message: string,
    public readonly fieldErrors?: Record<string, string[]>,
  ) {
    super(message);
    this.name = "AppError";
  }

  static notFound = (message = "Resource not found") => new AppError("NOT_FOUND", message);
  static conflict = (message: string) => new AppError("CONFLICT", message);
  static tooManyRequests = () =>
    new AppError("RATE_LIMITED", "Too many requests. Please try again later.");
}
