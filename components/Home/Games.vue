<template>
  <div>
    <UtilsListLoading :loading="loading" />

    <div v-if="steamGameList.data && steamGameList.data.length > 0 && !loading">
      <h2 class="uppercase text-xs font-semibold text-gray-400 mb-4">最近在玩 \ 总时长</h2>
      <ul class="space-y-2">
        <li v-for="(game, id) in steamGameList.data" :key="id">
          <a class="flex items-center gap-3 hover:bg-gray-200 dark:hover:bg-white/10 p-2 rounded-lg -m-2 text-sm min-w-0" target="_blank">
            <UAvatar :alt="game.name" :src="getThumbnail(game.game_id)" :ui="{ rounded: 'rounded-md' }" />
            <p class="truncate text-gray-700">
              {{ gameTitle(game.name_cn, game.name) }}
            </p>
            <span class="flex-1"></span>
            <span class="text-xs text-gray-400 dark:text-gray-600 min-w-24"> {{ toMinutes(game.play_time) }} </span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import duration from "dayjs/plugin/duration";

const steamGameList = inject("steamGameList");
const loading = ref(false);
const apiServer = useRuntimeConfig().public.apiServer;

dayjs.extend(duration); // 使用插件

onMounted(async () => {
  if (!steamGameList.value.loaded) {
    loading.value = true;
    $fetch(apiServer + "/api/public/steam/games", { method: "POST" })
      .then(response => {
        steamGameList.value.data = response.data;
        steamGameList.value.loaded = true;
        loading.value = false;
      })
      .catch(error => {
        console.error("Error:", error);
        loading.value = false;
      });
  }
});

function getThumbnail(id) {
  return `/icon/steam/${id}.jpg`;
}

function toMinutes(src) {
  const durationObj = dayjs.duration(src, "minute");
  const hours = Math.floor(durationObj.asHours()); // 获取整数小时数
  const minutes = durationObj.minutes(); // 获取剩余的分钟数
  return `${hours} 小时 ${minutes} 分钟`;
}

function gameTitle(nameCn, name) {
  if (nameCn === null) {
    return name;
  } else {
    return nameCn + " - " + name;
  }
}
</script>
