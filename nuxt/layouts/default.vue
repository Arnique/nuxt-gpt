<template lang="pug">
AppHeader
main#page(class="relative pt-[--header-h]")
  slot
AppFooter
UNotifications 
</template>

<script setup lang="ts">
  useHead({
    bodyAttrs: {
      class: 'bg-gray-900'
    },
  })
</script>
