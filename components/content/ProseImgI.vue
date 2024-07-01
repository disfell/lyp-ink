<template>
  <MyRootImg :src="checkImg(src, false)" :alt="alt" />
</template>
<script setup>
const appConfig = useAppConfig()
const props = defineProps({
  src: {
    default: ''
  },
  alt: {
    default: "lyp.ink",
  }
})
</script>