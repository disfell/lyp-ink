<template>
  <div v-if="src.trim() != ''">
    <div class="space-y-4 border-solid border-2 dark:border-gray-800">
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
