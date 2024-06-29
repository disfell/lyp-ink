<template>
  <strong :class="chooseClass">
    <slot />
  </strong>
</template>
<script setup>
const props = defineProps({
  type: {
    default: ''
  }
})
const map = {
  '': 'font-bold rounded cursor-pointer dark:text-zinc-400',
  'green': 'font-bold rounded cursor-pointer bg-green-300 dark:bg-green-700 dark:text-slate-300 p-1 mx-1 text-sm'
}

const chooseClass = computed(() => {
  return map[props.type]
})
</script>