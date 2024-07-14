<template>
  <strong :class="chooseClass">
    <slot />
  </strong>
</template>
<script setup>
import { inject } from 'vue'
const state = inject('state')
const props = defineProps({
  type: {
    default: ''
  }
})
const map = {
  '': 'font-bold rounded cursor-pointer dark:text-zinc-400',
  'sky': 'font-bold rounded cursor-pointer bg-sky-300 dark:bg-sky-900 dark:text-zinc-400 p-1 mx-1 text-sm',
  'green': 'font-bold rounded cursor-pointer bg-green-300 dark:bg-green-900 dark:text-zinc-400 p-1 mx-1 text-sm',
  'red': 'font-bold rounded cursor-pointer bg-red-300 dark:bg-red-900 dark:text-zinc-400 p-1 mx-1 text-sm',
  'lime': 'font-bold rounded cursor-pointer bg-lime-300 dark:bg-lime-900 dark:text-zinc-400 p-1 mx-1 text-sm',
  'emerald': 'font-bold rounded cursor-pointer bg-emerald-300 dark:bg-emerald-900 dark:text-zinc-400 p-1 mx-1 text-sm',
  'teal': 'font-bold rounded cursor-pointer bg-teal-300 dark:bg-teal-900 dark:text-zinc-400 p-1 mx-1 text-sm',
  'cyan': 'font-bold rounded cursor-pointer bg-cyan-300 dark:bg-cyan-900 dark:text-zinc-400 p-1 mx-1 text-sm',
  'indigo': 'font-bold rounded cursor-pointer bg-indigo-300 dark:bg-indigo-900 dark:text-zinc-400 p-1 mx-1 text-sm',
  'violet': 'font-bold rounded cursor-pointer bg-violet-300 dark:bg-violet-900 dark:text-zinc-400 p-1 mx-1 text-sm',
  'purple': 'font-bold rounded cursor-pointer bg-purple-300 dark:bg-purple-900 dark:text-zinc-400 p-1 mx-1 text-sm',
}

const chooseClass = computed(() => {
  return map[state.color]
})
</script>