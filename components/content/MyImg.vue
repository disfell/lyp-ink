<template>
  <MyImage :src="refinedSrc" :alt="alt" />
</template>
<script setup>
import { withBase } from 'ufo'
import { useRuntimeConfig, computed } from '#imports'
const props = defineProps({
  src: {
    type: String,
    default: ''
  },
  alt: {
    type: String,
    default: ''
  }
})
const refinedSrc = computed(() => {
  if (props.src?.startsWith('/') && !props.src.startsWith('//')) {
    return withBase(props.src, useRuntimeConfig().app.baseURL)
  }
  return props.src
})
</script>