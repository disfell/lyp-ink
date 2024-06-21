<template>
  <div class="p-8 w-full flex gap-6 snap-x snap-mandatory overflow-x-auto bg-stone-50 dark:bg-stone-700 rounded-md border dark:border-stone-400">
    <div v-for="(i, idx) in items" :key="idx" class="snap-center shrink-0 shadow-lg cursor-pointer">
      <a :src="checkImg(i, true)" data-fancybox="gallery" data-caption="lyp.ink">
        <MyRootImg :src="checkImg(i, true)" class="content.MyImgList"/>
      </a>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  items: {
    default: []
  }
})
</script>