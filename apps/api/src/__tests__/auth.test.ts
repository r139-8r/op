import request from 'supertest';
import { createApp } from '../app';
import { hashPassword } from '../auth/password';

describe('auth', () => {
  it('registers a user and returns a token', async () => {
    const prisma = {
      user: {
        findUnique: jest.fn().mockResolvedValue(null),
        create: jest.fn().mockImplementation(async ({ data }: any) => ({
          id: 'user_1',
          email: data.email,
          passwordHash: data.passwordHash,
          createdAt: new Date(),
          updatedAt: new Date()
        }))
      },
      budget: { findMany: jest.fn(), create: jest.fn() },
      category: { findMany: jest.fn(), create: jest.fn() },
      expense: { findMany: jest.fn(), create: jest.fn() },
      monthlySummary: { findMany: jest.fn(), create: jest.fn() }
    } as any;

    const app = createApp({ prisma });

    const res = await request(app)
      .post('/auth/register')
      .send({ email: 'Test@Example.com', password: 'password123' })
      .expect(201);

    expect(res.body).toEqual({
      token: expect.any(String),
      user: { id: 'user_1', email: 'test@example.com' }
    });
  });

  it('logs in a user and returns a token', async () => {
    const passwordHash = await hashPassword('password123');

    const prisma = {
      user: {
        findUnique: jest.fn().mockResolvedValue({
          id: 'user_1',
          email: 'test@example.com',
          passwordHash,
          createdAt: new Date(),
          updatedAt: new Date()
        })
      },
      budget: { findMany: jest.fn(), create: jest.fn() },
      category: { findMany: jest.fn(), create: jest.fn() },
      expense: { findMany: jest.fn(), create: jest.fn() },
      monthlySummary: { findMany: jest.fn(), create: jest.fn() }
    } as any;

    const app = createApp({ prisma });

    const res = await request(app)
      .post('/auth/login')
      .send({ email: 'test@example.com', password: 'password123' })
      .expect(200);

    expect(res.body).toEqual({
      token: expect.any(String),
      user: { id: 'user_1', email: 'test@example.com' }
    });
  });
});
