<template lang="pug">
Page
  Chat
</template>

<script setup>
  definePageMeta({
    middleware: ['auth']
  })
  
  useHead({
    title: 'Chat with AI',
  })
</script>