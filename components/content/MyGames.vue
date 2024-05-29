<template>
  <div v-if="loadingMyStatus" class="block z-50 px-3 py-2 rounded-2xl">
    <LazyMyLoading />
  </div>
  <table v-if="!loadingMyStatus" class="text-sm">
    <thead>
      <tr>
        <th class="rounded-tl-lg dark:bg-inherit bg-slate-100 border-b dark:border-zinc-800 font-medium pl-3 pt-5 pb-3 text-slate-400 dark:text-slate-200 text-left">
          游戏名称
        </th>
        <th class="dark:bg-inherit bg-slate-100 border-b dark:border-zinc-800 font-medium pt-5 pb-3 text-slate-400 dark:text-slate-200 text-left">
          近 2 周游戏时长
        </th>
        <th class="rounded-tr-lg dark:bg-inherit bg-slate-100 border-b dark:border-zinc-800 font-medium pr-3 pt-5 pb-3 text-slate-400 dark:text-slate-200 text-right">
          总游戏时长
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(i, idx) in recentlyGames" :id="idx" :key="idx">
        <td class="border-b border-slate-100 dark:border-zinc-800 pl-3 py-4 text-slate-500 dark:text-inherit">
          <div class="flex items-center">
            <img v-if="i.appid" :src="`/icon/steam/${i.appid}.jpg`" class="rounded-sm mr-1 w-6" />
            
            <span v-if="idx == 0"> 🥇 </span>
            <span v-if="idx == 1"> 🥈 </span>
            <span v-if="idx == 2"> 🥉 </span>

            <div>&nbsp;{{ i.name == i.name_cn ? '' : i.name_cn + ' - ' }} {{ i.name }}</div>
          </div>
        </td>
        <td class="border-b border-slate-100 dark:border-zinc-800 py-4 text-slate-500 dark:text-inherit text-right">
          {{ minutesToHoursAndMinutes(i.playtime_2weeks) }}
        </td>
        <td class="border-b border-slate-100 dark:border-zinc-800 pr-3 py-4 text-slate-500 dark:text-inherit text-right">
          {{ minutesToHoursAndMinutes(i.playtime_forever) }}
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script setup>
onMounted(() => {
  getData()
})

const config = useAppConfig()
const statusUrl = config.statusAPI
const loadingMyStatus = ref(false)
const recentlyGames = ref([])

async function getData() {
  loadingMyStatus.value = true
  try {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const response = await fetch(statusUrl, options)
    let data = await response.json()
    recentlyGames.value = data?.games
  } catch (error) { 
    // 捕获并处理请求或响应过程中的错误
    console.error('There was a problem with the fetch operation:', error);
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