<template lang="pug">
div(class="text-xs font-mono")
  UMeter(:value="user.tokensUsed" :max="user.maxTokens" :color="color" :ui="{ meter: { base: 'w-[100px]' }, wrapper: 'w-full flex flex-row gap-3 items-center' }")
    template(#indicator="{ percent }")
      div(class="opacity-50") {{ user.tokensUsed }}/{{ user.maxTokens }} tkns used
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useAuthStore } from '~/stores/auth'
import { computed } from 'vue'

const config = useRuntimeConfig()

const authStore = useAuthStore()
const { user, userReq } = storeToRefs(authStore)
const color = computed(() => {
  const pct = user.value.tokensUsed / user.value.maxTokens * 100
  return pct < 25 ? 'green' : pct < 50 ? 'amber' : 'rose'
})
</script>
