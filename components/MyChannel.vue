<template>
  <Transition name="slide-fade">
    <div v-if="platform && currentApp" class="fixed top-4 right-0">
      <div ref="slidePanel" class="relative cursor-pointer">
        <div class="backdrop-blur-md border border-zinc-300 dark:border-zinc-700 rounded-l-lg 
          bg-zinc-50 dark:text-zinc-100 dark:bg-zinc-800 p-4 shadow
          transition-transform duration-500 ease-in-out"
          :style="panelStyle"
          @click="togglePanel">
          <div v-if="platform" class="text-sm">
            <strong>TA</strong> 正在使用 {{ platform }}
          </div>
          <div class="h-12 w-12 mt-4 jelly-effect-hover">
            <Transition mode="out-in">
              <img v-if="currentApp" :key="currentApp" :src="`/icon/app/${currentApp}.png`" :alt="currentApp"
                class="shadow border dark:border-zinc-700 p-1 rounded-lg"/>
            </Transition>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>
<script setup>
import { createClient } from '@supabase/supabase-js'
const appConfig = useAppConfig()
const currentApp = ref('')
const platform = ref('')
const slidePanel = ref(null)
const isPanelVisible = ref(true)
const panelStyle = ref('')

const togglePanel = () => {
  isPanelVisible.value = !isPanelVisible.value
}

onMounted(() => {
  if (isProd()) {
    const supabaseUrl = appConfig.supabaseUrl
    const supabaseAnnoKey = appConfig.supabaseAnnoKey
    const supaClient = createClient(supabaseUrl, supabaseAnnoKey)
    const supaChannel = supaClient.channel('lyp-ink')
    supaChannel
      .on('broadcast', { event: 'mystatus' },
        (payload) => messageReceived(payload)
      ).subscribe()
  }
})

watch(isPanelVisible, (newValue, oldValue) => {
  const transformValue = newValue ? 'translateX(0)' : `translateX(${slidePanel.value.clientWidth - 20}px)`
  panelStyle.value = { transform: transformValue }
})

function messageReceived(res) {
  const data = JSON.parse(res.payload.message)
  console.debug(data)
  currentApp.value = data.current_app
  platform.value = data.platform
}
</script>
<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>