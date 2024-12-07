<template>
  <div>
    <h2 class="uppercase text-xs font-semibold text-gray-400 mb-6">网站技术驱动</h2>
    <div class="space-y-4">
      <AppProviderCard v-for="link in links" :key="link.name" :obj="link" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const links = [
  {
    name: "Nuxt",
    url: "https://nuxt.com/",
    iconL: "/icon/other/nuxt.svg",
    iconD: "/icon/other/nuxt.svg",
    description: "网站基于 Nuxt 构建.",
  },
  {
    name: "Tailwind CSS",
    url: "https://tailwindcss.com/",
    iconL: "/icon/other/tailwindcss.svg",
    iconD: "/icon/other/tailwindcss.svg",
    description: "大部分样式都基于 Tailwind CSS 构建.",
  },
  {
    name: "Vercel",
    url: "https://vercel.com/",
    iconL: "/icon/other/vercel-l.webp",
    iconD: "/icon/other/vercel-d.webp",
    description: "网站托管在 Vercel，By Free Plan.",
  },
  {
    name: "Supabase",
    url: "https://supabase.com/",
    iconL: "/icon/other/supabase.svg",
    iconD: "/icon/other/supabase.svg",
    description: "网站的一些数据保存在 Supabase，By Free Plan.",
  },
  {
    name: "Cloudimage",
    url: "https://www.cloudimage.io/",
    iconL: "/icon/other/cloudimage-light.svg",
    iconD: "/icon/other/cloudimage.png",
    description: "图片 CDN，网站大图片都靠它分流，By Free Plan.",
    iconIsLen: true,
  },
  {
    name: "GitHub",
    url: "https://github.com/",
    iconL: "/icon/other/github-l.webp",
    iconD: "/icon/other/github-d.webp",
    description: "代码托管于 GitHub.",
  },
  {
    name: "Steam",
    url: "https://store.steampowered.com/",
    iconL: "/icon/other/steam.svg",
    iconD: "/icon/other/steam.svg",
    description: "用到了 Steam 的 API 获取游戏列表.",
  },
  {
    name: "中文网字计划",
    url: "https://chinese-font.netlify.app/",
    iconL: "/icon/other/chinese-font.netlify.app.ico",
    iconD: "/icon/other/chinese-font.netlify.app.ico",
    description: "用了网站切割好的字体：“抖音美好体”.",
  },
  
];
</script>
