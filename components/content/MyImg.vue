<template>
  <div class="grid justify-items-center">
    <a :src="checkImg(src, conf.public.useImgCDN === 'true')" data-fancybox="gallery" data-caption="lyp.ink" class="cursor-pointer">
      <MyRootImg :src="checkImg(src, conf.public.useImgCDN === 'true')" class="content.MyImg" :alt="alt"/>
    </a>
  </div>
</template>
<script setup>
const conf = useRuntimeConfig()
const props = defineProps({
  src: {
    default: ''
  },
  alt: {
    default: "lyp.ink",
  }
})
</script>