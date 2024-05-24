<template>
  <main class="my-5">
    <iframe
      :src="refinedSrc"
      scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" width="100%" height="389" :title="props.bvid">
    </iframe>
  </main>
</template>
<script setup>
const props = defineProps({
  aid: {
    type: String,
    default: ''
  },
  bvid: {
    type: String,
    default: ''
  },
  cid: {
    type: String,
    default: ''
  },
})

const refinedSrc = computed(() => {
  return `https://www.bilibili.com/blackboard/html5mobileplayer.html?aid=${props.aid}&bvid=${props.bvid}&cid=${props.cid}&page=1&danmaku=0`
})
</script>