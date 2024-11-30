<template>
  <div>
    <h2 class="uppercase text-xs font-semibold text-gray-400 mb-6">
      网站技术驱动
    </h2>
    <div class="space-y-4">
      <AppProviderCard
        v-for="link in links"
        :key="link.name"
        :obj="link"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const links = [
  {
    name: "GitHub",
    url: "https://github.com/",
    iconL: "/icon/other/github-l.webp",
    iconD: "/icon/other/github-d.webp",
    description: "面向开源及私有软件项目的托管平台."
  },
  {
    name: "Vercel",
    url: "https://vercel.com/",
    iconL: "/icon/other/vercel-l.webp",
    iconD: "/icon/other/vercel-d.webp",
    description: "云服务平台，支持静态网站和动态网站的应用部署."
  },
  {
    name: "Supabase",
    url: "https://supabase.com/",
    iconL: "/icon/other/supabase.svg",
    iconD: "/icon/other/supabase.svg",
    description: "定位为Firebase的开源替代品."
  },
  {
    name: "Tailwind CSS",
    url: "https://tailwindcss.com/",
    iconL: "/icon/other/tailwindcss.svg",
    iconD: "/icon/other/tailwindcss.svg",
    description: "只需书写HTML 代码，无需书写CSS."
  },
  {
    name: "Nuxt",
    url: "https://nuxt.com/",
    iconL: "/icon/other/nuxt.svg",
    iconD: "/icon/other/nuxt.svg",
    description: "基于Vue.js 的通用应用框架."
  },
  {
    name: "Steam",
    url: "https://store.steampowered.com/",
    iconL: "/icon/other/steam.svg",
    iconD: "/icon/other/steam.svg",
    description: "常用的游戏平台."
  }
];
</script>
