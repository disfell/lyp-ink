<template>
  <MyRootImg :src="checkImg(src, appConfig.useImgCDN)" :alt="alt" />
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