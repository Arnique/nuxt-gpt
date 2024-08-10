const {
  NUXT_PUBLIC_FB_API_KEY,
  NUXT_PUBLIC_FB_APP_ID,
  NUXT_PUBLIC_FB_AUTH_DOMAIN,
  NUXT_PUBLIC_FB_MESSAGING_SENDER_ID,
  NUXT_PUBLIC_FB_PROJECT_ID,
  NUXT_PUBLIC_FB_STORAGE_BUCKET,
  NUXT_ADMIN_EMAILS,
  NUXT_AUTH_COOKIE,
  NUXT_OPENAI_KEY,
} = process.env

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  runtimeConfig: {
    authCookie: NUXT_AUTH_COOKIE,
    adminEmails: NUXT_ADMIN_EMAILS,
    openaiKey: NUXT_OPENAI_KEY,
    public: {
      maxTokens: 100,
      fb: {
        apiKey: NUXT_PUBLIC_FB_API_KEY,
        appId: NUXT_PUBLIC_FB_APP_ID,
        authDomain: NUXT_PUBLIC_FB_AUTH_DOMAIN,
        messagingSenderId: NUXT_PUBLIC_FB_MESSAGING_SENDER_ID,
        projectId: NUXT_PUBLIC_FB_PROJECT_ID,
        storageBucket: NUXT_PUBLIC_FB_STORAGE_BUCKET,
      }
    }
  },
  devtools: { enabled: true },
  colorMode: {
    preference: 'dark'
  },
  modules: [
    '@nuxt/ui',
    '@nuxt/image',
    '@nuxt/icon',
    '@nuxtjs/mdc',
    '@pinia/nuxt'
  ],
  css: [
    '@/assets/scss/main.scss'
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/scss/_global.scss";'
        }
      }
    }
  }
})