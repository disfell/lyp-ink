<template>
  <div :class="finalColorClass">
    <div class="text-center text-6xl font-bold dark:text-zinc-400 ">{{ title }}</div>
    <div class="flex items-center justify-center space-x-2 dark:text-zinc-400 my-10">
      <svg class="h-4 w-4 self-center" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
      <span class="text-center text-sm">{{ formatTime(date) }}</span>
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
  }
})

const colorsMap = {
  "sky": "bg-gradient-to-b from-sky-200 dark:from-sky-950/60 py-12",
  "green": "bg-gradient-to-b from-green-200 dark:from-green-950/60 py-12",
  "red": "bg-gradient-to-b from-red-200 dark:from-red-950/60 py-12",
  "lime": "bg-gradient-to-b from-lime-200 dark:from-lime-950/60 py-12",
  "emerald": "bg-gradient-to-b from-emerald-200 dark:from-emerald-950/60 py-12",
  "teal": "bg-gradient-to-b from-teal-200 dark:from-teal-950/60 py-12",
  "cyan": "bg-gradient-to-b from-cyan-200 dark:from-cyan-950/60 py-12",
  "indigo": "bg-gradient-to-b from-indigo-200 dark:from-indigo-950/60 py-12",
  "violet": "bg-gradient-to-b from-violet-200 dark:from-violet-950/60 py-12",
  "purple": "bg-gradient-to-b from-purple-200 dark:from-purple-950/60 py-12",
  "pink": "bg-gradient-to-b from-pink-200 dark:from-pink-950/60 py-12",
  "rose": "bg-gradient-to-b from-rose-200 dark:from-rose-950/60 py-12"
}

if (props.color != '') {
  finalColorClass.value = colorsMap[props.color]
} else {
  finalColorClass.value = colorsMap[state.color]
}
</script>