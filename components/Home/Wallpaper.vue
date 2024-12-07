<template>
  <div v-if="src.trim() != ''">
    <div class="space-y-4 border-solid border-4 bs dark:border-gray-400">
      <img :src="src" alt="isha" />
    </div>
  </div>
</template>
<script setup>
const runtimeCf = useRuntimeConfig();
const imgCDN = runtimeCf.public.imgCDN;
const src = ref("");
if (imgCDN !== null && imgCDN.trim() !== "") {
  src.value = imgCDN + "/" + "https://w.wallhaven.cc/full/m3/wallhaven-m37jz1.png";
}
</script>
<style>
.bs {
  box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
}
</style>
