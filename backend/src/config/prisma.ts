/**
 * Prisma database client configuration
 *
 * This module initializes and exports a configured Prisma client that connects
 * to a PostgreSQL database using the PrismaPg adapter.
 */

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.js";

/**
 * PostgreSQL adapter instance for Prisma
 * Uses the DATABASE_URL environment variable to establish connection parameters
 */
const adapter = new PrismaPg(process.env.DATABASE_URL!);

/**
 * Exported Prisma Client instance
 *
 * This is the main database client used throughout the application for performing
 * database operations. It is configured with the PrismaPg adapter for PostgreSQL
 * compatibility.
 *
 * @type {PrismaClient}
 * @example
 * // Usage in other modules:
 * import { prisma } from './config/prisma';
 * const users = await prisma.user.findMany();
 */
export const prisma = new PrismaClient({adapter});