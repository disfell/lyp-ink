<template>
  <main class="min-h-screen">
    <DotLottieVue
      style="height: 500px; width: 500px"
      autoplay
      loop
      src="https://lottie.host/44198546-1aae-41f7-b8eb-75d38d4a0610/Yp7ln81nJ7.lottie" />
  </main>
</template>
<script setup>
import { DotLottieVue } from "@lottiefiles/dotlottie-vue";

useSeoMeta({
  title: "测试 | " + useAppConfig().site.title,
  description: useAppConfig().site.intro,
});
</script>
