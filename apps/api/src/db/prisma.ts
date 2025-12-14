import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient | undefined;

export function getPrismaClient(): PrismaClient {
  if (!prisma) {
    prisma = new PrismaClient();
  }

  return prisma;
}

export type PrismaClientLike = Pick<
  PrismaClient,
  'user' | 'budget' | 'category' | 'expense' | 'monthlySummary'
>;
