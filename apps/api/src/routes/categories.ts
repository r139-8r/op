import { Router } from 'express';
import { z } from 'zod';
import type { PrismaClientLike } from '../db/prisma';
import { asyncHandler } from '../middleware/asyncHandler';
import { authRequired } from '../middleware/authRequired';
import { validateBody } from '../middleware/validate';

const createCategorySchema = z.object({
  name: z.string().min(1)
});

export function createCategoriesRouter(deps: { prisma: PrismaClientLike }): Router {
  const router = Router();

  router.use(authRequired);

  router.get(
    '/',
    asyncHandler(async (req, res) => {
      const categories = await deps.prisma.category.findMany({
        where: { userId: req.user!.id },
        orderBy: { name: 'asc' }
      });

      res.status(200).json({ data: categories });
    })
  );

  router.post(
    '/',
    validateBody(createCategorySchema),
    asyncHandler(async (req, res) => {
      const category = await deps.prisma.category.create({
        data: {
          userId: req.user!.id,
          name: req.body.name
        }
      });

      res.status(201).json({ data: category });
    })
  );

  return router;
}
