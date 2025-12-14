import cors from 'cors';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { getPrismaClient, type PrismaClientLike } from './db/prisma';
import { errorHandler } from './middleware/errorHandler';
import { createAuthRouter } from './routes/auth';
import { createBudgetsRouter } from './routes/budgets';
import { createCategoriesRouter } from './routes/categories';
import { createExpensesRouter } from './routes/expenses';
import { openApiSpec } from './openapi/spec';

export function createApp(deps?: { prisma?: PrismaClientLike }) {
  const prisma = deps?.prisma ?? getPrismaClient();

  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get('/health', (_req, res) => res.status(200).json({ ok: true }));

  app.get('/openapi.json', (_req, res) => res.status(200).json(openApiSpec));
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(openApiSpec));

  app.use('/auth', createAuthRouter({ prisma }));
  app.use('/budgets', createBudgetsRouter({ prisma }));
  app.use('/categories', createCategoriesRouter({ prisma }));
  app.use('/expenses', createExpensesRouter({ prisma }));

  app.use((_req, res) => res.status(404).json({ error: { message: 'Not found' } }));

  app.use(errorHandler);

  return app;
}
