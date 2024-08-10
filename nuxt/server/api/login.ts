import { verifyFirebaseJWT } from '~/server/utilz'
import { useDrizzle, tables, InsertUser } from '~/server/utils/drizzle'
import { eq } from 'drizzle-orm';
import { UserRole } from '~/server/database/schema'

export default eventHandler(async (event) => {
  const { r = '/', t, p } = getQuery<{ r: string, t: string, p: string }>(event)

  if (!t) throw createError({
    statusCode: 406,
    statusMessage: 'Token required!'
  })

  // Find user using token
  const [er, fbToken] = await verifyFirebaseJWT(t)
  if (er || !fbToken) throw createError({
    statusMessage: er.message
  })

  const { users } = tables
  const user = useDrizzle().select().from(users).where(eq(users.id, fbToken.user_id!)).get()

  // New user
  if (!user) {
    const { adminEmails } = useRuntimeConfig(event)
    const adminList = !adminEmails ? [] : adminEmails.split(',').map(x => x.trim().toLowerCase()) 
    const role = adminList.includes(fbToken.email) ? UserRole.Admin : UserRole.Member
    const maxTokens = role === UserRole.Admin ? 10000 : 300

    const newUser: InsertUser = {
      id: fbToken.user_id,
      name: fbToken.name,
      email: fbToken.email,
      avatar: fbToken.picture,
      createdAt: new Date(),
      authProvider: p,
      role,
      maxTokens
    }

    await useDrizzle().insert(users).values(newUser)
  }

  // Set auth cookie
  const { authCookie } = useRuntimeConfig(event)
  setCookie(event, authCookie, t, { httpOnly: true })
  await sendRedirect(event, r)
})
