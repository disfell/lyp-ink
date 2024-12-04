<template>
  <main class="min-h-screen">
    <AppHeader class="mb-8" title="书签" :description="description" />

    <div class="text-right italic text-xs mb-6 text-gray-500 dark:text-gray-400">
      网站图标由 {{ appCf.outer.faviconCatcher }} 获取
    </div>
    <ul class="space-y-2">
      <li v-for="(bookmark, id) in bookmarks" :key="id">
        <a
          :href="bookmark.url"
          target="_blank"
          class="flex items-center gap-3 hover:bg-gray-200 dark:hover:bg-white/10 p-2 rounded-lg -m-2 text-sm min-w-0">
          <UAvatar
            :src="getThumbnail(bookmark.url)"
            :alt="bookmark.label"
            :ui="{ rounded: 'rounded-md' }" />
          <p class="truncate text-gray-700 dark:text-gray-200">
            {{ bookmark.label }}
          </p>
          <span class="flex-1"></span>
          <span class="text-xs font-medium text-gray-400 dark:text-gray-600">
            {{ getHost(bookmark.url) }}
          </span>
        </a>
      </li>
    </ul>
  </main>
</template>

<script setup>
const description = "我在互联网上发现的一些有趣、有用的东西，收集仍在进行中。🚣‍♂️";
useSeoMeta({
  title: "书签 | " + useAppConfig().site.title,
  description,
});
const appCf = useAppConfig();

const bookmarks = [
  {
    label: "基于 Nuxt、Tailwind CSS 的样式框架.",
    url: "https://ui.nuxt.com/",
  },
  {
    label: "bmrks",
    url: "https://bmrks.com/",
  },
];

function getHost(url) {
  const parsedUrl = new URL(url);
  return parsedUrl.host;
}

function getThumbnail(url) {
  const host = getHost(url);
  return `${appCf.outer.faviconCatcher}/${host}`;
}
</script>
