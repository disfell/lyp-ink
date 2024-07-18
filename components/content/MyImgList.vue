<template>
  <div class="bg py-8 px-2 w-full flex gap-6 snap-x snap-mandatory overflow-x-auto rounded-2xl md:rounded-t-2xl md:rounded-b-none border dark:border-zinc-700
    min-h-56 lg:min-h-64">
    <div v-for="(i, idx) in items" :key="idx" class="snap-center shrink-0 shadow-2xl cursor-pointer">
      <a :src="checkImg(i, conf.public.useImgCDN === 'true')" data-fancybox="gallery" data-caption="lyp.ink">
        <MyRootImg :src="checkImg(i, conf.public.useImgCDN === 'true')" class="content.MyImgList"/>
      </a>
    </div>
  </div>
</template>
<script setup>
const conf = useRuntimeConfig()
const props = defineProps({
  items: {
    default: []
  }
})
</script>
<style scoped>
.bg {
  background-image: url("~/assets/bg/1.png");
}
@media (prefers-color-scheme: light) {
  .bg {
    background-color: #f5f5f5;
  }
}

@media (prefers-color-scheme: dark) {
  .bg {
    background-color: #272727;
  }
}
</style>