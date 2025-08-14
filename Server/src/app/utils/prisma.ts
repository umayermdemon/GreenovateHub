import { PrismaClient } from "../../../generated/prisma";

export const prisma = new PrismaClient();

export const paginationQueries: string[] = ['sortBy', 'sortOrder', 'limit', 'page']