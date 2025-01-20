import { db } from "@/db/db";
import { messages } from "@/db/schema";
import { seedData } from "@/lib/seedDate";
import { ilike } from "drizzle-orm";

async function seed() {
  try {
    for (const data of seedData) {
      const normalizedQuery = data.query.toLowerCase().trim();
      const existingRecord = await db
        .select()
        .from(messages)
        .where(ilike(messages.query, normalizedQuery));

      if (existingRecord.length === 0) {
        await db.insert(messages).values(data);
      } else {
        console.log(`Skipped (already exists): "${data.query}"`);
      }
    }

    console.log("Database seeding completed successfully!");
  } catch (err) {
    console.error("Error seeding database:", err);
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

seed();