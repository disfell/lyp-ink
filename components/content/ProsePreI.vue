<template>
  <div :class="$props.class" class="bg-gray-100 dark:bg-zinc-600/30 my-2 border border-zinc-200 dark:border-zinc-500 rounded">
    <slot />
  </div>
</template>
<script setup>
const props = defineProps({
  code: {
    default: ''
  },
  language: {
    default: null
  },
  filename: {
    default: null
  },
  highlights: {
    default: () => []
  },
  meta: {
    default: null
  },
  class: {
    default: null
  }
})
</script>