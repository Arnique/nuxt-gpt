<template lang="pug">
div(class="mx-auto py-[100px] max-w-[1000px] grid grid-cols-3 gap-5")
  UCard(v-for="user in data.data" :key="user.id")
    div(class="flex gap-4 items-start")
      UAvatar(:src="user.avatar" chip-color="primary" size="lg")
      div
        h4(class="text-lg font-bold mb-2") {{ user.name }}
        div {{ user.email }}
        div(class="opacity-50") {{ user.authProvider }}
        UButton(variant="outline" size="sm") Sign Out
</template>

<script setup>
  const { data, error } = useFetch('/api/users')
</script>
