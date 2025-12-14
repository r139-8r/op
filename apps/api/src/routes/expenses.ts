import { Router } from 'express';
import { z } from 'zod';
import type { PrismaClientLike } from '../db/prisma';
import { asyncHandler } from '../middleware/asyncHandler';
import { authRequired } from '../middleware/authRequired';
import { validateBody } from '../middleware/validate';

const createExpenseSchema = z.object({
  amount: z.number().positive(),
  description: z.string().min(1).optional(),
  date: z.string().datetime(),
  categoryId: z.string().uuid().optional(),
  budgetId: z.string().uuid().optional()
});

export function createExpensesRouter(deps: { prisma: PrismaClientLike }): Router {
  const router = Router();

  router.use(authRequired);

  router.get(
    '/',
    asyncHandler(async (req, res) => {
      const expenses = await deps.prisma.expense.findMany({
        where: { userId: req.user!.id },
        orderBy: { date: 'desc' }
      });

      res.status(200).json({ data: expenses });
    })
  );

  router.post(
    '/',
    validateBody(createExpenseSchema),
    asyncHandler(async (req, res) => {
      const expense = await deps.prisma.expense.create({
        data: {
          userId: req.user!.id,
          amount: req.body.amount,
          description: req.body.description,
          date: new Date(req.body.date),
          categoryId: req.body.categoryId,
          budgetId: req.body.budgetId
        }
      });

      res.status(201).json({ data: expense });
    })
  );

  return router;
}
