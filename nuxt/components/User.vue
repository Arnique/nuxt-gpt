<template lang="pug">
div(class="mx-auto py-[100px] max-w-[400px]")
  UCard
    div(class="flex gap-4 items-start")
      UAvatar(:src="user.avatar" chip-color="primary" size="3xl")
      div
        h4(class="text-lg font-bold mb-2") {{ user.name }}
        div {{ user.email }}
        div(class="opacity-50") Signed in using {{ user.authProvider }}
</template>

<script setup>
  import { storeToRefs } from 'pinia'
  import { useAuthStore } from '~/stores/auth'

  const authStore = useAuthStore()
  const { user, userReq } = storeToRefs(authStore)
</script>
