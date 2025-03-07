<template>
  <main class="min-h-screen">
    <AppHeader :description="description" class="mb-8" title="书签" />

    <div v-if="bookmarks.data && bookmarks.data.length > 0 && !loading" class="text-right italic text-xs mb-6 text-gray-500 dark:text-gray-400">
      网站图标由<a :href="appCf.outer.faviconCatcher" class="text-gray-500 dark:text-gray-400 underline" target="_blank">{{
        getHost(appCf.outer.faviconCatcher)
      }}</a
      >获取
    </div>

    <UtilsListLoading :loading="loading" />

    <ul v-if="bookmarks.data && bookmarks.data.length > 0 && !loading" class="space-y-2">
      <li v-for="(bookmark, id) in bookmarks.data" :key="id">
        <a
          :href="getHttps(getHost(bookmark.url))"
          class="flex items-center gap-3 hover:bg-gray-200 dark:hover:bg-white/10 p-2 rounded-lg -m-2 text-sm min-w-0"
          target="_blank">
          <img v-lazy-image="getThumbnail(bookmark.url)" alt="" class="rounded-md w-8 h-8" defaultWH="32px,32px" />
          <p class="truncate text-gray-700">
            {{ bookmark.name }}
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
const apiServer = useRuntimeConfig().public.apiServer;
const appCf = useAppConfig();
const bookmarks = inject("bookmarks");
const loading = ref(false);

function getHost(url) {
  try {
    // 处理没有协议的情况（如 "example.com/path"）
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      url = "http://" + url; // 临时添加协议以正确解析
    }
    const urlObj = new URL(url);
    return urlObj.host;
  } catch (e) {
    console.error("无效的 URL:", e);
    return null;
  }
}

function getHttps(host) {
  return "https://" + host;
}

function getThumbnail(url) {
  const host = getHost(url);
  return `${appCf.outer.faviconCatcher}/${host}`;
}

onMounted(() => {
  loadBookmarks();
});

async function loadBookmarks() {
  loading.value = true;
  if (bookmarks.value.loaded) {
    loading.value = false;
    return;
  }

  const request = new Request(apiServer + "/api/public/notion/qryDatabase?databaseId=18542b97f2bc80f0bd65ff76351b35a8", {
    method: "POST",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify({
      sorts: [
        {
          timestamp: "created_time",
          direction: "ascending",
        },
      ],
    }),
  });

  await $fetch(request)
    .then(response => {
      bookmarks.value.data = response.data;
      bookmarks.value.loaded = true;
      loading.value = false;
    })
    .catch(error => {
      console.error("Error:", error);
      loading.value = false;
    });
}
</script>
