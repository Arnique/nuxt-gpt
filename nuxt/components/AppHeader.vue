<template lang="pug">
header#header(class="h-[--header-h] fixed index-0 z-10 w-full bg-gray-900")
  div(class="flex mx-auto px-8 gap-2 h-full items-center")
    Icon(name="arcticons:openai-chatgpt" class="text-3xl")
    NuxtLink(to="/" class="text-2xl flex") 
      span(class="font-bold") Nuxt
      span(class="text-primary-500") GPT

    div(v-if="user" class="ml-auto flex items-center gap-4")
      NuxtLink(to="/") Start Chatting
      UButton(@click="logout" size="lg" variant="outline" :ui="{ rounded: 'rounded-full' }") Sign Out
      NuxtLink(to="/account")
        UAvatar(:src="user.avatar")
    div(v-else class="ml-auto flex items-center gap-4")
      UButton(to="/login" variant="outline" :ui="{ rounded: 'rounded-full' }") Sign In
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import { useAuthStore } from '~/stores/auth'

  const authStore = useAuthStore()
  const { googleLogin, logout } = authStore
  const { user } = storeToRefs(authStore)

</script>


