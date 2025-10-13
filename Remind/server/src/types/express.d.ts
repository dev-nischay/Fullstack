declare namespace Express {
  export interface Request {
    userId?: string;
    validatedParams?: {
      id?: string;
      hash?: string;
    };
    validatedBody?: unknown;
    validatedQuery?: unknown;
  }
}
