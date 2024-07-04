import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import AppError from './AppError';

class ErrorHandlerMiddleware {
  public static handleError: ErrorRequestHandler = (
    error: Error,
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message, 
      });
    }
    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  };
}

export default ErrorHandlerMiddleware;
