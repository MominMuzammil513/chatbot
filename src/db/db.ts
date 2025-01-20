import dotenv from 'dotenv';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { messages } from './schema';

dotenv.config();
const dbUrl = process.env.DATABASE_URL!;
const client = postgres(dbUrl);
export const db = drizzle(client, { schema: { messages }, logger: false });
