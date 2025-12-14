import type { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import { AppError } from '../errors/AppError';

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof ZodError) {
    return res.status(400).json({
      error: {
        message: 'Validation error',
        issues: err.issues
      }
    });
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: {
        message: err.message,
        code: err.code,
        details: err.details
      }
    });
  }

  if (err && typeof err === 'object' && 'code' in err && (err as any).code === 'P2002') {
    return res.status(409).json({
      error: {
        message: 'Unique constraint violation',
        code: 'UNIQUE_CONSTRAINT'
      }
    });
  }

  console.error(err);

  return res.status(500).json({
    error: {
      message: 'Internal server error'
    }
  });
};
