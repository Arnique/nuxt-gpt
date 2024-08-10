import { useDrizzle, tables } from '~/server/utils/drizzle'
import { toApiResponse, toApiErrorResponse } from '~/shared/utilz'

export default eventHandler(async (event) => {
  try {
    adminOnly(event)
    const { users } = tables
    const data = useDrizzle().select().from(users).all()
    return toApiResponse(event, data)
  } catch (error: any) {
    return toApiErrorResponse(event, error)
  }
})
