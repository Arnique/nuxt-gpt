import { drizzle } from 'drizzle-orm/better-sqlite3'
export { sql, eq, and, or } from 'drizzle-orm'
import Database from 'better-sqlite3';
import * as schema from '../database/schema'

const db = new Database('sqlite.db');

export const tables = schema

export function useDrizzle() {
  return drizzle(db, { schema })
}

export type User = typeof schema.users.$inferSelect
export type InsertUser = typeof schema.users.$inferInsert
