import { useDrizzle, tables } from '~/server/utils/drizzle'
import { eq } from 'drizzle-orm';
import { toApiResponse, toApiErrorResponse } from '~/shared/utilz'

export default eventHandler(async (event) => {
  try {
    userOnly(event)
    const { users } = tables
    const data = useDrizzle().select().from(users).where(eq(users.id, event.context.user?.id!)).get()
    return toApiResponse(event, data)
  } catch (error: any) {
    console.log(error)
    return toApiErrorResponse(event, error)
  }
})
