<template>
  <div class="grid justify-items-center">
    <a :src="checkImg(src, appConfig.useImgCDN)" data-fancybox="gallery" data-caption="lyp.ink" class="cursor-pointer">
      <MyRootImg :src="checkImg(src, appConfig.useImgCDN)" class="content.MyImg" :alt="alt"/>
    </a>
  </div>
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