<template>
  <MyRootImg :src="checkImg(src, true)" :alt="alt" />
</template>
<script setup>
const props = defineProps({
  src: {
    default: ''
  },
  alt: {
    default: "lyp.ink",
  }
})
</script>