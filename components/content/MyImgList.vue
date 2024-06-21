<template>
  <div class="bg py-8 px-2 w-full flex gap-6 snap-x snap-mandatory overflow-x-auto rounded-t-2xl border dark:border-zinc-700">
    <div v-for="(i, idx) in items" :key="idx" class="snap-center shrink-0 shadow-2xl cursor-pointer">
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
<style scoped>
.bg {
  background-image: url("/bg/1.png");
}
@media (prefers-color-scheme: light) {
  .bg {
    background-color: #ffffff;
  }
}

@media (prefers-color-scheme: dark) {
  .bg {
    background-color: #272727;
  }
}
</style>