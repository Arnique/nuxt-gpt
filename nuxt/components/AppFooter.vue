<template lang="pug">
footer#footer(class="h-[--footer-h] border-t border-t-gray-800")
  div(class="flex items-center w-full h-full px-8")
    div(class="opacity-50") Copyright &copy; 2024 NuxtGPT
    div(class="ml-auto")
      a(v-for="v in socials" :key="v.href" :href="v.href" class="p-2" :style="{fontSize: v.size}")
        Icon(:name="v.icon" class="text-xl")
</template>

<script setup>
  const links = ref([
    {
      label: 'Fairness',
      to: '/fairness'
    },
    {
      label: 'Support',
      to: '/support'
    },
    {
      label: 'Responsible Gambling',
      to: '/responsible-gambling'
    },
    {
      label: 'Terms of service',
      to: '/privacy'
    },
  ])

  const socials = ref([
    {
      icon: 'bi:github',
      href: '/twitter',
      size: '16px'
    }
  ])
</script>