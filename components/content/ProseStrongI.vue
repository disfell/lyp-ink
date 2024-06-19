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
  '': 'font-bold rounded px-1 cursor-pointer',
  'greenBg': 'font-bold rounded px-1 cursor-pointer bg-green-300 dark:bg-green-500'
}

const chooseClass = computed(() => {
  return map[props.type]
})
</script>