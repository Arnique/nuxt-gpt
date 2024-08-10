import { H3Event } from 'h3'
import { ApiError } from '~/shared/utilz'
import { UserRole } from '~/server/database/schema'

export const userOnly = (event: H3Event) => {
  if (!event.context.user) {
    throw new ApiError('Please login first', 406, 'NO_AUTH')
  }
}

export const adminOnly = (event: H3Event) => {
  if (!event.context.user) {
    throw new ApiError('Please login first', 406, 'NO_AUTH')
  }

  if (event.context.user.role !== UserRole.Admin) {
    throw new ApiError('Access Denied', 406, 'AUTH_DENIED')
  }
}