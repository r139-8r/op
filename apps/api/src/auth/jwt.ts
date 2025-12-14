import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { AppError } from '../errors/AppError';

export type AuthTokenPayload = {
  userId: string;
  email: string;
};

export function signAccessToken(payload: AuthTokenPayload): string {
  return jwt.sign(
    { email: payload.email },
    env.JWT_SECRET,
    {
      subject: payload.userId,
      expiresIn: env.JWT_EXPIRES_IN
    }
  );
}

export function verifyAccessToken(token: string): AuthTokenPayload {
  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as jwt.JwtPayload & { email?: unknown };

    if (!decoded.sub || typeof decoded.sub !== 'string') {
      throw new AppError('Invalid token subject', { statusCode: 401, code: 'INVALID_TOKEN' });
    }

    const email = decoded.email;
    if (!email || typeof email !== 'string') {
      throw new AppError('Invalid token payload', { statusCode: 401, code: 'INVALID_TOKEN' });
    }

    return { userId: decoded.sub, email };
  } catch {
    throw new AppError('Invalid token', { statusCode: 401, code: 'INVALID_TOKEN' });
  }
}
