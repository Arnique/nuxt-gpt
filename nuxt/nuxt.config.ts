const {
  apiKey,
  appId,
  authDomain,
  messagingSenderId,
  projectId,
  storageBucket,
  adminEmails,
  authCookie,
  openaiKey,
} = process.env

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  runtimeConfig: {
    authCookie,
    adminEmails,
    openaiKey,
    public: {
      maxTokens: 100,
      fb: {
        apiKey,
        appId,
        authDomain,
        messagingSenderId,
        projectId,
        storageBucket,
      }
    }
  },
  devtools: { enabled: true },
  colorMode: {
    preference: 'dark'
  },
  modules: [
    '@nuxt/ui',
    '@pinia/nuxt',
    '@nuxt/icon',
    '@nuxtjs/mdc'
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