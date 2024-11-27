<template>
  <div class="space-y-6">
    <img src="/avatar.png" alt="Fayaz Ahmed"
      class="ring-2 border ring-gray-200 border-gray-300 dark:ring-white/10 dark:border-gray-800 hover:ring-4 transition-all duration-300 bg-gray-200 dark:bg-gray-900 rounded-full h-12 w-12 sm:h-16 sm:w-16"
      placeholder format="webp" />
    <h1 class="text-xl font-bold tracking-tight text-gray-800 dark:text-gray-100">
      Hello!
    </h1>
    <p class="text-gray-900 dark:text-gray-400">
      我是 LYP, 该网站主要记录自己的学习、生活、游戏以及平平无奇的时光
    </p>
    <p class="text-gray-900 dark:text-gray-400">
      自我介绍？喜欢吃喝玩乐🐽......溜~
    </p>
  </div>
</template>

<script setup>
useSeoMeta({
  title: "LYP",
  description:
    "I'm LYP, your friendly neighborhood software, product engineer and designer from Bengaluru, India. I specialize in building web applications and sites using Javascript, React, Vue & Node.",
});
</script>
