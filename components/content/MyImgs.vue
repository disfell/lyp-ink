<template>
  <div class="my-images">
    <div v-for="(i, idx) in imgs" :key="i">
      <LazyMyImage :src="i" />
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  srcs: {
    type: String,
    default: ''
  }
})

const imgs = computed(() => {
  return props.srcs.split('|*|');
})
</script>
<style>
.my-images {
  /* 列的间隙宽度 */
  column-gap: 1px;
  /* 列的宽度 */
  column-width: auto;
  /* 涉及文字,避免文字内容断裂 */
  -webkit-column-break-inside: avoid;
  page-break-inside: avoid;
  break-inside: avoid;
}

/* 列数量 */
@media screen and (min-width: 640px) {
  .my-images {
    column-count: 1;
  }
}

@media screen and (min-width: 768px) {
  .my-images {
    column-count: 2;
  }
}

@media screen and (min-width: 1280px) {
  .my-images {
    column-count: 3;
  }
}
</style>