export class AppError extends Error {
  constructor(
    public message: string,
    public Statuscode: number,
    public isOperational = true
  ) {
    super(message);
  }
}
