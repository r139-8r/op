import request from 'supertest';
import { createApp } from '../app';
import { signAccessToken } from '../auth/jwt';

describe('budgets', () => {
  it('creates a budget for the authenticated user', async () => {
    const token = signAccessToken({ userId: 'user_1', email: 'test@example.com' });

    const prisma = {
      user: { findUnique: jest.fn(), create: jest.fn() },
      budget: {
        findMany: jest.fn(),
        create: jest.fn().mockImplementation(async ({ data }: any) => ({
          id: 'budget_1',
          userId: data.userId,
          name: data.name,
          month: data.month,
          amount: data.amount,
          createdAt: new Date(),
          updatedAt: new Date()
        }))
      },
      category: { findMany: jest.fn(), create: jest.fn() },
      expense: { findMany: jest.fn(), create: jest.fn() },
      monthlySummary: { findMany: jest.fn(), create: jest.fn() }
    } as any;

    const app = createApp({ prisma });

    const res = await request(app)
      .post('/budgets')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'December', month: '2025-12-01T00:00:00.000Z', amount: 500 })
      .expect(201);

    expect(res.body.data).toMatchObject({
      id: 'budget_1',
      userId: 'user_1',
      name: 'December',
      amount: 500
    });
  });
});
