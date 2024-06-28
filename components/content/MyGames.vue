<template>
  <div v-if="loadingMyStatus" class="block z-50 px-3 py-2 rounded-2xl">
    <LazyMyLoading />
  </div>
  <table v-if="!loadingMyStatus" class="text-sm">
    <thead>
      <tr>
        <th class="rounded-tl-lg dark:bg-inherit border-b dark:border-zinc-800 font-medium pl-3 pt-5 pb-3 text-slate-400 dark:text-slate-200 text-left">
          游戏名称
        </th>
        <th class="dark:bg-inherit border-b dark:border-zinc-800 font-medium pt-5 pb-3 text-slate-400 dark:text-slate-200 text-left">
          近 2 周游戏时长
        </th>
        <th class="rounded-tr-lg dark:bg-inherit border-b dark:border-zinc-800 font-medium pr-3 pt-5 pb-3 text-slate-400 dark:text-slate-200 text-right">
          总游戏时长
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(i, idx) in recentlyGames" :id="idx" :key="idx">
        <td class="border-b border-slate-100 dark:border-zinc-800 pl-3 py-4 text-slate-500 dark:text-inherit">
          <div class="flex items-center">
            <img v-if="i.game_id" :src="`/icon/steam/${i.game_id}.jpg`" class="rounded-sm mr-1 w-6" alt=""/>
            
            <span v-if="idx == 0"> 🥇 </span>
            <span v-if="idx == 1"> 🥈 </span>
            <span v-if="idx == 2"> 🥉 </span>

            <div>&nbsp;{{ i.name == i.name_cn ? '' : i.name_cn + ' - ' }} {{ i.name }}</div>
          </div>
        </td>
        <td class="border-b border-slate-100 dark:border-zinc-800 py-4 text-slate-500 dark:text-inherit text-right">
          {{ minutesToHoursAndMinutes(i.play_time_2weeks) }}
        </td>
        <td class="border-b border-slate-100 dark:border-zinc-800 pr-3 py-4 text-slate-500 dark:text-inherit text-right">
          {{ minutesToHoursAndMinutes(i.play_time) }}
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script setup>
import { inject } from 'vue'
const state = inject('state')

onMounted(() => {
  getData()
})

const config = useAppConfig()
const domain = config.domain
const localDomain = config.localDomain
const gamesURL = config.gamesURL
const loadingMyStatus = ref(false)
const recentlyGames = ref([])

async function getData() {
  loadingMyStatus.value = true
  if (state.steamGames.length <= 0) {
    try {
      const response = await fetch(process.env.NODE_ENV === 'production' ? domain + gamesURL : localDomain + gamesURL)
      let data = await response.json()
      recentlyGames.value = data?.data
      state.steamGames = data?.data
    } catch (error) { 
      console.error('There was a problem with the fetch operation:', error);
    }
  } else {
    recentlyGames.value = state.steamGames
  }
  loadingMyStatus.value = false
}

function minutesToHoursAndMinutes(minutes) {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (hours <= 0 && remainingMinutes > 0) {
    return remainingMinutes + "分钟"
  }
  if (hours > 0 && remainingMinutes <=0) {
    return hours + "小时"
  }
  return hours + "小时" + remainingMinutes + "分钟"
}
</script>