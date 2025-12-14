import { Router } from 'express';
import { z } from 'zod';
import { signAccessToken } from '../auth/jwt';
import { hashPassword, verifyPassword } from '../auth/password';
import type { PrismaClientLike } from '../db/prisma';
import { AppError } from '../errors/AppError';
import { asyncHandler } from '../middleware/asyncHandler';
import { validateBody } from '../middleware/validate';

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
});

export function createAuthRouter(deps: { prisma: PrismaClientLike }): Router {
  const router = Router();

  router.post(
    '/register',
    validateBody(registerSchema),
    asyncHandler(async (req, res) => {
      const email = String(req.body.email).toLowerCase();
      const password = String(req.body.password);

      const existing = await deps.prisma.user.findUnique({ where: { email } });
      if (existing) {
        throw new AppError('Email already registered', { statusCode: 409, code: 'EMAIL_TAKEN' });
      }

      const passwordHash = await hashPassword(password);

      const user = await deps.prisma.user.create({
        data: {
          email,
          passwordHash
        }
      });

      const token = signAccessToken({ userId: user.id, email: user.email });

      res.status(201).json({
        token,
        user: {
          id: user.id,
          email: user.email
        }
      });
    })
  );

  router.post(
    '/login',
    validateBody(loginSchema),
    asyncHandler(async (req, res) => {
      const email = String(req.body.email).toLowerCase();
      const password = String(req.body.password);

      const user = await deps.prisma.user.findUnique({ where: { email } });
      if (!user) {
        throw new AppError('Invalid credentials', { statusCode: 401, code: 'INVALID_CREDENTIALS' });
      }

      const ok = await verifyPassword(password, user.passwordHash);
      if (!ok) {
        throw new AppError('Invalid credentials', { statusCode: 401, code: 'INVALID_CREDENTIALS' });
      }

      const token = signAccessToken({ userId: user.id, email: user.email });

      res.status(200).json({
        token,
        user: {
          id: user.id,
          email: user.email
        }
      });
    })
  );

  return router;
}
