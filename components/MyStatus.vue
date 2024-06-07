<template>
  <div class="flex items-center justify-center">
    <div v-if="loadingMyStatus" class="block z-50 px-3 py-2 rounded-2xl">
        <LazyMyLoading />
    </div>
    <transition name="bounce">
      <div v-if="showCard && !loadingMyStatus" class="block
          backdrop-blur-xl dark:bg-zinc-700/30 bg-gray-50 hover:bg-gray-100 dark:text-slate-400
          z-50 px-3 py-2 rounded-2xl online-card">
        <div v-if="showSteamOnline" id="steam-card" class="mt-3">
          <div class="grid justify-items-center">
            <button class="inline-flex items-baseline justify-center tooltip relative">
              <LazyColorStatus class="mr-2" />
              <img src="/icon/steam/steam.svg" class="self-center w-6 h-6 rounded-full mx-1" alt=""/>
              <div class="ml-1">{{ showSteamOnline ? steamOnline1Text : '' }} {{ showSteamGaming ? steamOnline2Text : '' }}</div>
              <div v-if="showSteamGaming" class="tooltiptext">
                <button class="inline-flex items-baseline">
                  <img :src="showSteamGaming ? `/icon/steam/${statusData.game_id}.jpg` : '/favicon.png'" class="self-center w-6 h-6 rounded-full mx-1" alt=""/>
                  <div class="ml-1">{{ statusData.game_cn ? statusData.game_cn : statusData.game }}</div>
                </button>
              </div>
            </button>
          </div>
        </div>
        <!-- <div v-if="showMyStatus" id="working-card" class="mt-3">
          <div class="grid justify-items-center">
            <button class="inline-flex items-baseline justify-center">
              <div class="self-center w-6 h-6 rounded-sm mx-1 ">🧑🏻‍💻</div>
              <div class="self-center ml-1">{{ showMyStatus ? workingText : '' }}</div>
            </button>
          </div>
        </div> -->
      </div>
    </transition>
  </div>
</template>
<script setup>
onMounted(() => {
  getData()
  timer.value = window.setInterval(() => getData(), interval)
})

const config = useAppConfig()
const domain = config.domain
const localDomain = config.localDomain
const steamStatusURL = config.steamStatusURL
const interval = config.statusFetchInterval
const showCard = ref(false)
const showSteamOnline = ref(false)
const showSteamGaming = ref(false)
const showMyStatus = ref(false)
const loadingMyStatus = ref(false)
const timer = ref(null)
const statusData = ref({})

const steamOnline1Text = 'Steam 在线'
const steamOnline2Text = ', TA 正在游戏中'
const workingText = 'TA 正在上班'

onUnmounted(() => {
  clearInterval(timer.value)
  timer.value = null
})

async function getData() {
  loadingMyStatus.value = true
  try {
    const steamStatusResp = await fetch(process.env.NODE_ENV === 'production' ? domain + steamStatusURL : localDomain + steamStatusURL)
    const steamStatus = await steamStatusResp.json()

    const steamOnline = 'status' in steamStatus && steamStatus.status && steamStatus.status == 1
    const steamGaming = 'game_id' in steamStatus

    showCard.value = steamOnline
    if (showCard) {
      showSteamOnline.value = steamOnline
      showSteamGaming.value = steamGaming
      statusData.value['game_id'] = steamStatus.game_id
      statusData.value['game'] = steamStatus.game
      statusData.value['game_cn'] = steamStatus?.game_cn
    }
  } catch (error) { 
    console.error('There was a problem with the fetch operation:', error);
  }
  loadingMyStatus.value = false
}
</script>
<style>
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}

.online-card *:first-child {
  margin-top: 0;
}
</style>