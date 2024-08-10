<template lang="pug">
div(class="flex flex-col gap-2 rounded-2xl py-3 px-4 border border-gray-700 hover:bg-gray-800 cursor-pointer")
  Icon(:name="icon" class="text-3xl mt-3" :class="[color]")
  div {{ text }}
</template>

<script setup>
  const props = defineProps(['text', 'icon', 'color'])
</script>

