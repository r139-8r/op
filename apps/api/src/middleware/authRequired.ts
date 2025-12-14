import type { RequestHandler } from 'express';
import { verifyAccessToken } from '../auth/jwt';
import { AppError } from '../errors/AppError';

export const authRequired: RequestHandler = (req, _res, next) => {
  const header = req.header('authorization');

  if (!header) {
    return next(new AppError('Missing Authorization header', { statusCode: 401, code: 'UNAUTHORIZED' }));
  }

  const [scheme, token] = header.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return next(new AppError('Invalid Authorization header', { statusCode: 401, code: 'UNAUTHORIZED' }));
  }

  const payload = verifyAccessToken(token);
  req.user = { id: payload.userId, email: payload.email };
  next();
};
