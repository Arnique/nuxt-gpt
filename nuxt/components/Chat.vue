<template lang="pug">
div
  div(ref="chatBox" style="height: calc(100vh - var(--chat-offset))" class="overflow-y-auto")
    div(v-if="!messages.length" class="text-center py-[60px]")
      Icon(name="arcticons:openai-chatgpt" class="text-[60px] animate-spin" style="animation-duration: 8s")

    div(v-if="!messages.length" class="grid grid-cols-3 gap-4 max-w-3xl mx-auto")
      div(v-for="(v,i) in tips" :key="i")
        TipBox(:text="v.text" :icon="v.icon" :color="v.color" @click="pickChat(v.text)")

    div(class="max-w-3xl mx-auto prose prose-invert")
      div(v-for="(v,i) in messages" :key="i" class="flex")
        div(v-if="i % 2 == 0" class="py-3 px-4 rounded-3xl bg-gray-800 ml-auto") {{ v }}
        div(v-else class="py-3 px-4 rounded-3xl")
          div(v-if="streaming") {{ v }}
          MDC(v-else :value="v")

  div(class="max-w-3xl mx-auto fixed left-0 right-0 bottom-[--footer-h] px-8 md:px-0")
    form(class="relative" @submit.prevent="send")
      textarea(
        v-model="prompt" 
        @keydown="handleEnter" 
        @input="autoGrow" 
        placeholder="Ask me anything!" 
        style="resize: none" 
        class="overflow-y-hidden box-border leading-[20px] pt-[18px] h-[56px] box-border w-full bg-gray-800 rounded-[28px] block pl-[20px] pr-[40px]"
      )
      button(type="submit" :disabled="!prompt.trim()" class="disabled:bg-gray-700 rounded-full absolute right-[7px] bottom-[7px] h-[42px] w-[42px] flex items-center justify-center bg-primary-500")
        Icon(name="ph:arrow-up-bold")
    div(class="font-mono text-sm h-[56px] pt-5 md:pt-0 flex flex-col md:flex-row items-center justify-center gap-2")
      TokensMeter
      UButton(variant="ghost" @click="clearChat") Clear Chat
</template>

<script setup>
  import { useAuthStore } from '~/stores/auth'

  const authStore = useAuthStore()
  const { setUser } = authStore

  const prompt = ref('')
  const chatBox = ref(null)
  const messages = ref([])
  const streaming = ref(false)

  const tips = ref([
    {
      icon: 'tdesign:animation-1',
      color: 'text-yellow-300',
      text: 'Plan a relaxing day'
    },
    {
      icon: 'tdesign:animation-1',
      color: 'text-violet-300',
      text: 'Explain nostalgia to a child'
    },
    {
      icon: 'tdesign:animation-1',
      color: 'text-blue-300',
      text: 'Reverse a string in Javascript'
    },
  ])

  function pickChat(v) {
    prompt.value = v
    send()
  }

  function clearChat() {
    prompt.value = ''
    messages.value = []
  }

  function autoGrow(evt) {
    evt.target.style.height = 'auto'
    evt.target.style.height = evt.target.scrollHeight + 'px'
  }

  function handleEnter(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      send()
    }
  }

  function scrollChat() {
    setTimeout(() => {
      chatBox.value.scrollTop = chatBox.value.scrollHeight
    }, 100)
  }

  async function send() {
    const [prevAnswer] = messages.value.length ? messages.value.slice(-1) : [null]
    messages.value.push(prompt.value)
    messages.value.push('')
    streaming.value = true

    const response = await fetch('/api/openai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prevAnswer,
        prompt: prompt.value
      }),
    });

    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');
    let result = '';
    prompt.value = ''

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const str = decoder.decode(value, { stream: true })
      console.log(str)

      if (str.includes('<[EOS]>')) {
        const { tokensUsed, error} = JSON.parse(str.replace('<[EOS]>', ''))
        if (tokensUsed) setUser({ tokensUsed })
        if (error) {
          result += `<div class="text-rose-500"><b>ERROR:</b> ${error}</div>`
        }
      } else {
        result += str
      }

      messages.value.splice(-1, 1, result)
      scrollChat()
    }

    streaming.value = false

  }
</script>