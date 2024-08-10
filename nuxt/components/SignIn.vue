<template lang="pug">
div(class="max-w-96 mx-auto text-center")
  div(class="text-center py-[60px]")
    Icon(name="arcticons:openai-chatgpt" class="text-[60px]")

  p(class="mb-5 text-lg") Please sign in to continue...

  div(class="flex flex-col gap-4")
    UButton(@click="googleLogin" variant="outline" size="xl" :ui="{ padding: { xl: 'py-3 px-5'}, rounded: 'rounded-full', variant: { outline: 'ring-gray-700'} }")
      Icon(name="uil:google" class="text-xl text-white")
      span Continue with Google
    UButton(@click="githubLogin" variant="outline" size="xl" :ui="{ padding: { xl: 'py-3 px-5'}, rounded: 'rounded-full', variant: { outline: 'ring-gray-700'} }")
      Icon(name="uil:github" class="text-xl text-white")
      span Continue with Github
</template>

<script setup>
  import { useAuthStore } from '~/stores/auth'
  
  const authStore = useAuthStore()
  const { googleLogin, githubLogin } = authStore
</script>
