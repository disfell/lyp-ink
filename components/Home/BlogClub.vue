<template>
  <div>
    <h2 class="uppercase text-xs font-semibold text-gray-400 mb-4">
      加入他们
    </h2>
    <div class="space-y-5">
      <NuxtLink
        v-for="link in links"
        :key="link.name"
        :to="link.url"
        target="_blank"
        external
        class="flex items-end gap-4 dark:hover:text-gray-300 group"
      >
        <span class="text-sm">
          {{ link.name }}
        </span>
        <div
          class="flex-1 border-b border-dashed border-gray-300 dark:border-gray-800 group-hover:border-gray-700"
        ></div>
        <img v-if="link.iconL || link.iconD"
          :src="colorMode.value === 'dark' ? link.iconL : link.iconD"
          :alt="link.name"
          class="max-h-6"
        />
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
const colorMode = useColorMode();

const links = [
  {
    name: "BlogFinder",
    url: "https://bf.zzxworld.com/",
    iconL: "/icon/other/BlogFinder.png",
    iconD: "/icon/other/BlogFinder.png"
  },
  {
    name: "Travellings",
    url: "https://www.travellings.cn/go.html",
    iconL: "/icon/other/travellings-l.png",
    iconD: "/icon/other/travellings-d.png"
  },
  {
    name: "异次元之旅",
    url: "https://travel.moe/go.html",
    iconL: "/icon/other/icp.gov.moe.png",
    iconD: "/icon/other/icp.gov.moe.png"
  },
];
</script>
