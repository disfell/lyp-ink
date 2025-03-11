<template>
  <div class="my-10">
    <div
      v-if="steamGameList.data && steamGameList.data.length > 0 && !loading"
      class="text-right italic text-xs mb-6 text-gray-500 dark:text-gray-400">
      数据取自<a :href="steamAPIGetRecentlyPlayedGames" class="text-gray-500 dark:text-gray-400" target="_blank">SteamAPI</a>
    </div>
    <UtilsListLoading :loading="loading" />
    <div v-if="steamGameList.data && steamGameList.data.length > 0 && !loading">
      <ul class="space-y-2 pl-0">
        <li v-for="(game, id) in steamGameList.data" :key="id" class="list-none py-2">
          <span class="flex items-center gap-3 hover:bg-gray-200 dark:hover:bg-white/10 p-2 rounded-lg -m-2 text-sm min-w-0" target="_blank">
            <img v-lazy-image="getThumbnail(game.game_id)" :remark="gameTitle(game.name_cn, game.name)" alt="" class="my-0 rounded-md max-w-8" defaultWH="32px,32px" />
            <p class="truncate text-gray-700 my-0">
              {{ gameTitle(game.name_cn, game.name) }}
            </p>
            <span class="flex-1"></span>
            <span class="text-xs text-gray-400 dark:text-gray-600 min-w-24"> {{ toMinutes(game.play_time) }} </span>
          </span>
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
const steamAPIGetRecentlyPlayedGames = useAppConfig().outer.steamAPIGetRecentlyPlayedGames;

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

  if (!hours || hours <= 0) {
    return `${minutes}分钟`;
  }

  return `${hours}小时${minutes}分钟`;
}

function gameTitle(nameCn, name) {
  if (nameCn === null) {
    return name;
  } else {
    return nameCn + " - " + name;
  }
}
</script>
