"use server";

import { db } from '@/db/db';
import { messages } from '@/db/schema';
import { ilike } from 'drizzle-orm';

export async function getChatResponse(query: string): Promise<string> {
  const normalizedQuery = query.toLowerCase().trim();
  console.log('Query:', normalizedQuery);

  try {
    const result = await db
      .select()
      .from(messages)
      .where(ilike(messages.query, normalizedQuery));

    console.log('Result:', result);

    if (result.length > 0) {
      return result[0].response;
    } else {
      return "I'm sorry, I don't have an answer for that. Please try asking something else.";
    }
  } catch (error) {
    console.error('Database error:', error);
    return "An error occurred while processing your request. Please try again later.";
  }
}