<template>
  <div :class="finalColorClass">
    <div class="text-center text-6xl font-bold dark:text-zinc-400 ">{{ title }}</div>
    <div class="flex items-center justify-center space-x-2 dark:text-zinc-400 my-10">
      <svg class="h-4 w-4 self-center" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
      <span class="text-center text-sm">{{ formatTime(date) }}</span>
      
      <svg v-if="wordCount" class="h-4 w-4 self-center" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
      </svg>

      <span v-if="wordCount" class="text-center text-sm">≈{{ wordCount }}字</span>
    </div>
  </div>
</template>
<script setup>
import { inject } from 'vue'
const state = inject('state')
const finalColorClass = ref()
const props = defineProps({
  title: {
    default: ''
  },
  date: {
    default: ''
  },
  color: {
    default: ''
  },
  wordCount: {
    default: null
  }
})

const colorsMap = {
  "sky": "bg-gradient-to-b from-sky-100 dark:from-sky-950/60 py-12",
  "green": "bg-gradient-to-b from-green-100 dark:from-green-950/60 py-12",
  "lime": "bg-gradient-to-b from-lime-100 dark:from-lime-950/60 py-12",
  "emerald": "bg-gradient-to-b from-emerald-100 dark:from-emerald-950/60 py-12",
  "teal": "bg-gradient-to-b from-teal-100 dark:from-teal-950/60 py-12",
  "cyan": "bg-gradient-to-b from-cyan-100 dark:from-cyan-950/60 py-12",
  "indigo": "bg-gradient-to-b from-indigo-100 dark:from-indigo-950/60 py-12",
  "violet": "bg-gradient-to-b from-violet-100 dark:from-violet-950/60 py-12",
  "purple": "bg-gradient-to-b from-purple-100 dark:from-purple-950/60 py-12",
}

if (props.color != '') {
  finalColorClass.value = colorsMap[props.color]
} else {
  finalColorClass.value = colorsMap[state.color]
}
</script>