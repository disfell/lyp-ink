<template>
  <div class="flex items-center justify-center">
    <div v-if="loadingMyStatus" class="block z-50 px-3 py-2 rounded-2xl">
        <LazyMyLoading />
    </div>
    <div v-if="showCard && !loadingMyStatus" class="block
        backdrop-blur-xl dark:bg-zinc-700/30 bg-gray-50 hover:bg-gray-100 dark:text-slate-400
        z-50 px-3 py-2 rounded-2xl online-card">
      <div v-if="showSteamOnline" id="steam-card" class="mt-3">
        <div class="grid justify-items-center">
          <button class="inline-flex items-baseline justify-center tooltip relative">
            <LazyColorStatus class="mr-2" />
            <img :src="showSteamOnline ? '/icon/steam/steam.svg' : '/favicon.png'" class="self-center w-6 h-6 rounded-full mx-1" />
            <div class="ml-1">{{ showSteamOnline ? steamOnline1Text : '' }} {{ statusData.gameid ? steamOnline2Text : '' }}</div>
            <div v-if="showSteamGaming" class="tooltiptext">
              <button class="inline-flex items-baseline">
                <img :src="showSteamGaming ? `/icon/steam/${statusData?.gameid}.jpg` : '/favicon.png'" class="self-center w-6 h-6 rounded-full mx-1"/>
                <div class="ml-1">{{ typeof statusData.gameextrainfo_cn 
                  !== 'undefined' && statusData.gameextrainfo_cn !== null && statusData.gameextrainfo_cn !== '' ? 
                  statusData.gameextrainfo_cn : statusData.gameextrainfo }}</div>
              </button>
            </div>
          </button>
        </div>
      </div>
      <div v-if="showMyStatus" id="working-card" class="mt-3">
        <div class="grid justify-items-center">
          <button class="inline-flex items-baseline justify-center">
            <div class="self-center w-6 h-6 rounded-sm mx-1 ">🧑🏻‍💻</div>
            <div class="self-center ml-1">{{ showMyStatus ? workingText : '' }}</div>
          </button>
        </div>
      </div>
      <div v-if="showListening" id="music-card" class="mt-3">
        <div class="grid justify-items-center">
          <button class="inline-flex items-baseline justify-center tooltip relative">
            <div class="tooltiptext">
              <div>
                <p class="self-center">{{ showListening ? '《' + statusData?.listening_music + '》': '' }}</p>
                <p class="self-center">{{ showListening ? statusData?.listening_artist : '' }}</p>
              </div>
            </div>
            <img :src="showListening ? `/icon/apple/AppleMusic.svg` : '/favicon.png'" class="self-center w-6 h-6 rounded-sm mx-1 my-spin"/>
            <div class="self-center ml-1">{{ showListening ? listeningText : '' }}</div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
onMounted(() => {
  getData()
  timer.value = window.setInterval(() => getData(), interval)
})

const config = useAppConfig()
const statusUrl = config.statusAPI
const interval = config.statusFetchInterval
const showCard = ref(false)
const showSteamOnline = ref(false)
const showSteamGaming = ref(false)
const showListening = ref(false)
const showMyStatus = ref(false)
const loadingMyStatus = ref(false)
const timer = ref(null)
const statusData = ref({})

const steamOnline1Text = 'Steam 在线'
const steamOnline2Text = ', TA 正在游戏中'
const workingText = 'TA 正在上班'
const listeningText = 'TA 正在听歌'

onUnmounted(() => {
  clearInterval(timer.value)
  timer.value = null
})

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
    statusData.value = await response.json()
    showCard.value = // cond
      ('personastate' in statusData.value && statusData.value?.personastate && statusData.value?.personastate == 1) ||
      ('working' in statusData.value && statusData.value?.working) ||
      ('listening_music' in statusData.value && statusData.value?.listening_music)
    if (showCard) {
      showSteamOnline.value = statusData.value?.personastate && statusData.value?.personastate == 1
      showSteamGaming.value = 'gameid' in statusData.value && statusData.value?.gameid
      showListening.value = 'listening_music' in statusData.value && statusData.value?.listening_music
      showMyStatus.value = 'working' in statusData.value && statusData.value?.working
    }
  } catch (error) { 
    // 捕获并处理请求或响应过程中的错误
    console.error('There was a problem with the fetch operation:', error);
  }
  loadingMyStatus.value = false
}
</script>
<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.8s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.online-card *:first-child {
  margin-top: 0;
}
</style>