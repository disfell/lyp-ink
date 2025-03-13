<template>
  <main class="min-h-screen">
    <AppHeader :description="description" class="mb-8" title="书签" />

    <div v-if="bookmarks.tags && !loading" class="space-x-1 space-y-2 my-8">
      <UBadge size="sm" label="全部" color="gray" class="cursor-pointer" @click="selectTag('')" >
        <template v-if="tag === bookmarks.selected" #trailing>
          <UIcon name="i-heroicons-rocket-launch" class="w-4 h-4" />
        </template>
      </UBadge>
      <UBadge v-for="(tag, idx) in bookmarks.tags" :key="idx" size="sm" :label="tag" color="gray" class="cursor-pointer" @click="selectTag(tag)">
        <template v-if="tag === bookmarks.selected" #trailing>
          <UIcon name="i-heroicons-rocket-launch" class="w-4 h-4" />
        </template>
      </UBadge>
    </div>

    <div v-if="bookmarks.list && bookmarks.list.length > 0 && !loading" class="text-right italic text-xs mb-6 text-gray-500 dark:text-gray-400">
      网站图标由<a :href="appCf.outer.faviconCatcher" class="text-gray-500 dark:text-gray-400 underline" target="_blank">{{
        getHost(appCf.outer.faviconCatcher)
      }}</a
      >获取
    </div>

    <UtilsListLoading :loading="loading" />

    <ul v-if="bookmarks.list && bookmarks.list.length > 0 && !loading" class="space-y-2">
      <li v-for="(bookmark, id) in bookmarks.list" :key="id">
        <a
          :href="genHttps(bookmark.url)"
          class="flex items-center gap-3 hover:bg-gray-200 dark:hover:bg-white/10 p-2 rounded-lg -m-2 text-sm min-w-0"
          target="_blank">
          <img v-lazy-image="getThumbnail(bookmark.url)" :remark="bookmark.name" alt="" class="rounded-md w-8 h-8" defaultWH="32px,32px" />
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

function genHttps(url) {
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    url = "https://" + url;
  }
  return url;
}

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

function getThumbnail(url) {
  const host = getHost(url);
  return `${appCf.outer.faviconCatcher}/${host}`;
}

onMounted(() => {
  loadBookmarks("", false);
});

async function loadBookmarks(tag, reload) {
  loading.value = true;
  if (bookmarks.value.loaded && !reload) {
    loading.value = false;
    return;
  }

  const requestData = new Request(apiServer + "/api/public/notion/qryDatabase?databaseId=18542b97f2bc80f0bd65ff76351b35a8", {
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
      filter: {
        property: "tags",
        multi_select: {
          contains: tag,
        },
      },
    }),
  });

  const requestTags = new Request(apiServer + "/api/public/notion/qryDatabase?databaseId=18542b97f2bc80f0bd65ff76351b35a8&filter_properties=fI%3Ac", {
    method: "POST",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });

  await $fetch(requestData)
    .then(response => {
      bookmarks.value.list = response.data;
      bookmarks.value.selected = tag;
      bookmarks.value.loaded = true;
      loading.value = false;
    })
    .catch(error => {
      console.error("Error:", error);
      loading.value = false;
    });

  await $fetch(requestTags)
    .then(response => {
      let arr = [];
      for (let i = 0; i < response.data.length; i++) {
        const tags = response.data[i].tags;
        arr = arr.concat(tags);
      }
      const result = Array.from(new Set(arr));
      bookmarks.value.tags = result;
    })
    .catch(error => {
      console.error("Error:", error);
    });
}

function selectTag(tag) {
  loadBookmarks(tag, true);
}
</script>
