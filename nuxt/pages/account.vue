<template lang="pug">
Page
  User
</template>

<script setup>
  definePageMeta({
    middleware: ['auth']
  })
  
  useHead({
    title: 'Account',
  })
</script>