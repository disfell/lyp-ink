<template>
  <div class="grid justify-items-center">
    <a
      :src="checkImg(src, conf.public.useCloudimage)"
      data-fancybox="gallery"
      data-caption="lyp.ink"
      class="cursor-pointer"
    >
      <MyRootImg
        :src="checkImg(src, conf.public.useCloudimage)"
        class="content.MyImg"
        :alt="alt"
      />
    </a>
  </div>
</template>
<script setup>
const conf = useRuntimeConfig();
const props = defineProps({
  src: {
    default: "",
  },
  alt: {
    default: "lyp.ink",
  },
});
</script>
