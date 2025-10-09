export class AppError extends Error {
  constructor(
    public message: string,
    public statuscode: number,
    public isOperational = true
  ) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
  }
}
