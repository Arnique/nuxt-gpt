<template lang="pug">
Page
  Users
</template>

<script setup>
  definePageMeta({
    middleware: ['auth']
  })
  
  useHead({
    title: 'Admin',
  })
</script>