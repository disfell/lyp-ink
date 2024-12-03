<template>
  <div class="space-y-6" v-if="steamGameList.data && steamGameList.data.length > 0">
    <h2 class="uppercase text-xs font-semibold text-gray-400 mb-4">最近在玩 \ 总时长</h2>
    <ul class="space-y-2">
      <li v-for="(game, id) in steamGameList.data" :key="id">
        <a target="_blank" class="flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-white/10 p-2 rounded-lg -m-2 text-sm min-w-0">
          <UAvatar :src="getThumbnail(game.game_id)" :alt="game.name" :ui="{ rounded: 'rounded-md' }" />
          <p class="truncate text-gray-700 dark:text-gray-200">
            {{ `${game.name_cn} - ${game.name}` }}
          </p>
          <span class="flex-1"></span>
          <span class="text-xs font-medium text-gray-400 dark:text-gray-600"> {{ toMinutes(game.play_time) }} </span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup>
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import duration from "dayjs/plugin/duration";
const steamGameList = inject("steamGameList");

dayjs.extend(duration); // 使用插件

onMounted(async () => {
  if (!steamGameList.value.loaded) {
    $fetch("/api/games").then(response => {
      steamGameList.value.data = response.data;
      steamGameList.value.loaded = true;
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
</script>
