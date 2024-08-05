<template>
  <div :class="finalClass">
    <a
      href="https://bf.zzxworld.com/"
      target="_blank"
      class="hover:text-zinc-900 hover:font-bold dark:hover:text-zinc-100"
      >BlogFinder</a
    >
    <span class="px-1">|</span>
    <a
      href="https://www.travellings.cn/go.html"
      target="_blank"
      class="hover:text-zinc-900 hover:font-bold dark:hover:text-zinc-100"
      >travellings</a
    >
    <span class="px-1">|</span>
    <a
      href="https://travel.moe/go.html"
      target="_blank"
      class="hover:text-zinc-900 hover:font-bold dark:hover:text-zinc-100"
      title="异次元之旅-跃迁-我们一起去萌站成员的星球旅行吧！"
      >异次元之旅</a
    >
    <!-- <a href="https://icp.gov.moe/?keyword=20240920" target="_blank" class="hover:text-stone-800 dark:hover:text-stone-100">萌ICP备20240920号</a> -->
  </div>
</template>
<script setup>
const props = defineProps({
  class: {
    default: "",
    type: String,
  },
});

const classList = {
  "": "text-zinc-400 text-xs md:text-sm",
  rb: "fixed bottom-1 right-2 text-zinc-600 dark:text-zinc-400 text-xs md:text-sm md:bg-zinc-100 dark:md:bg-zinc-900 md:p-2 md:rounded-lg",
};

const finalClass = computed(() => {
  return classList[props.class];
});
</script>
