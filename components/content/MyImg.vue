<template>
  <div class="grid justify-items-center">
    <a :src="checkImg(src, true)" data-fancybox="gallery" data-caption="lyp.ink" class="cursor-pointer">
      <MyRootImg :src="checkImg(src, true)" class="content.MyImg" :alt="alt"/>
    </a>
  </div>
</template>
<script setup>
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
</script>