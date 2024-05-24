<template>
  <div class="grid place-items-center h-screen">
    <div class="dark:text-cyan-50">
      <img class="h-12 w-12" :src="loadingSrc" />
      加载中....
    </div>
  </div>
</template>
<script setup>
const loadingSrc = computed(()=>{
  return `/loading/ghost.gif`
})
</script>