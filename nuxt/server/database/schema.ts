import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export enum UserRole {
  Admin = 'admin',
  Member = 'member',
}

export const users = sqliteTable('users', {
  id: text('id').notNull().unique(),
  authProvider: text('auth_provider').notNull().default('google.com'),
  avatar: text('avatar').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  email: text('email').notNull().unique(),
  locked: integer('locked', { mode: 'timestamp' }),
  name: text('name').notNull(),
  role: text('role', { enum: [UserRole.Admin, UserRole.Member] }).notNull(),
  tokensUsed: integer('tokens').default(0),
  maxTokens: integer('max_tokens').default(300),
})

export type IUser = typeof users.$inferSelect