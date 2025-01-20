import { pgTable, serial, text } from "drizzle-orm/pg-core"

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  query: text("query").notNull(),
  response: text("response").notNull(),
})

