<template>
  <table class="text-sm">
    <thead>
      <tr>
        <th class="rounded-tl-lg dark:bg-inherit bg-slate-100 border-b dark:border-zinc-800 font-medium pl-3 pt-5 pb-3 text-slate-400 dark:text-slate-200 text-left">
          游戏名称
        </th>
        <th class="dark:bg-inherit bg-slate-100 border-b dark:border-zinc-800 font-medium pt-5 pb-3 text-slate-400 dark:text-slate-200 text-left">
          平台
        </th>
        <th class="rounded-tr-lg dark:bg-inherit bg-slate-100 border-b dark:border-zinc-800 font-medium pr-3 pt-5 pb-3 text-slate-400 dark:text-slate-200 text-left">
          状态/进度
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(i, idx) in games" :id="idx" :key="idx">
        <td class="border-b border-slate-100 dark:border-zinc-800 pl-3 py-4 text-slate-500 dark:text-inherit">
          <div class="flex items-center">
            <img v-if="i.id" :src="`/icon/steam/${i.id}.jpg`" class="rounded-sm mr-1 w-6" />
            <div>{{ i.name }}</div>
          </div>
        </td>
        <td class="border-b border-slate-100 dark:border-zinc-800 py-4 text-slate-500 dark:text-inherit">
          {{ platformDict[i.platform]}}
        </td>
        <td class="border-b border-slate-100 dark:border-zinc-800 pr-3 py-4 text-slate-500 dark:text-inherit">
          {{ i.status }}
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script setup>
const games = ref([{
    id: "292030",
    name: "The Witcher 3：Wild Hunt（巫师3：狂猎）🎗",
    platform: 1,
    status: "二周目"
  }, {
    id: "1850570",
    name: "Death Stranding Director's Cut（死亡搁浅：导演剪辑版）🎗",
    platform: 2,
    status: "The End"
  }, {
    id: "1245620",
    name: "Elden Ring（艾尔登法环）🎗",
    platform: 1,
    status: "三周目"
  }, {
    id: "1238840",
    name: "Battlefield 1（战地1）🎗",
    platform: 1,
    status: "800 h+"
  }, {
    id: "582010",
    name: "Monster Hunter World：Iceborne（怪物猎人世界：冰原）",
    platform: 1,
    status: "400 h+"
  }, {
    id: "1091500",
    name: "Cyberpunk 2077（赛博朋克2077）",
    platform: 2,
    status: "偶尔玩"
  }, {
    id: "2358720",
    name: "黑神话：悟空",
    platform: 0,
    status: "-"
  }
])
const platformDict = ['-', 'Steam','Epic']
</script>