import { verifyFirebaseJWT } from '../utilz'
import { useDrizzle, tables, User } from '~/server/utils/drizzle'

declare module 'h3' {
  interface H3EventContext {
    user: User | undefined | null
  }
}

export default eventHandler(async event => {
  const { authCookie } = useRuntimeConfig(event)
  const token = getCookie(event, authCookie)
  if (!token) return

  const [err, fbToken] = await verifyFirebaseJWT(token)
  if (!fbToken) {
    deleteCookie(event, authCookie)
  }

  const user = useDrizzle().select().from(tables.users).where(eq(tables.users.id, fbToken?.user_id!)).get()
  event.context.user = user
})
