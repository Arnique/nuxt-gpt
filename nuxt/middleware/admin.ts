import { jwtDecode } from 'jwt-decode'
import { useAuthStore } from '~/stores/auth'
import { storeToRefs } from 'pinia'
import { UserRole } from '~/shared/types'

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (to.path.includes('login')) return

  const authStore = useAuthStore()

  if (import.meta.server) {
    try {
      const { authCookie } = useRuntimeConfig()
      const cookie = useCookie(authCookie)
      if (!cookie.value) throw new Error('Auth Cookie is empty!')
      jwtDecode(cookie.value!)

      const { initUser } = authStore
      await initUser()
      const { user } = storeToRefs(authStore)

      if (user.value?.role !== UserRole.Admin) throw new Error('Access denied!')
    } catch (er: any) {
      return navigateTo('/login')
    }
  }

  const { user } = storeToRefs(authStore)
  if (!user.value || user.value.role !== UserRole.Admin) return navigateTo('/login')
})
