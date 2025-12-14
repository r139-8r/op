import { Router } from 'express';
import { z } from 'zod';
import type { PrismaClientLike } from '../db/prisma';
import { asyncHandler } from '../middleware/asyncHandler';
import { authRequired } from '../middleware/authRequired';
import { validateBody } from '../middleware/validate';

const createBudgetSchema = z.object({
  name: z.string().min(1),
  month: z.string().datetime(),
  amount: z.number().positive()
});

export function createBudgetsRouter(deps: { prisma: PrismaClientLike }): Router {
  const router = Router();

  router.use(authRequired);

  router.get(
    '/',
    asyncHandler(async (req, res) => {
      const budgets = await deps.prisma.budget.findMany({
        where: { userId: req.user!.id },
        orderBy: { month: 'desc' }
      });

      res.status(200).json({ data: budgets });
    })
  );

  router.post(
    '/',
    validateBody(createBudgetSchema),
    asyncHandler(async (req, res) => {
      const budget = await deps.prisma.budget.create({
        data: {
          userId: req.user!.id,
          name: req.body.name,
          month: new Date(req.body.month),
          amount: req.body.amount
        }
      });

      res.status(201).json({ data: budget });
    })
  );

  return router;
}
