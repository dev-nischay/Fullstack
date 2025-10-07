class AppError extends Error {
  constructor(
    public message: string,
    public statuscode: number,
    public isOperational: boolean
  ) {
    super(message);
  }
}
