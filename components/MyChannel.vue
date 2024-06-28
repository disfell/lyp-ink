<template>
  <Transition name="slide-fade">
    <div v-if="platform && currentApp" class="fixed top-4 right-0">
      <div ref="slidePanel" class="relative cursor-pointer">
        <div class="backdrop-blur-md border border-slate-300 dark:border-slate-500 rounded-l-lg 
          bg-slate-100 dark:text-slate-100 dark:bg-slate-800 p-4 shadow-sm shadow-slate-500/40
          transition-transform duration-500 ease-in-out"
          :style="panelStyle"
          @click="togglePanel">
          <div v-if="platform" class="text-sm">
            TA 正在使用 {{ platform }}
          </div>
          <div class="h-8 w-8 mt-4 jelly-effect-auto">
            <img v-if="currentApp" :key="currentApp" :src="`/icon/app/${currentApp}.png`" alt="" />
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
  const supabaseUrl = appConfig.supabaseUrl
  const supabaseAnnoKey = appConfig.supabaseAnnoKey
  const supaClient = createClient(supabaseUrl, supabaseAnnoKey)
  const supaChannel = supaClient.channel('lyp-ink')
  supaChannel
    .on('broadcast', { event: 'mystatus' },
      (payload) => messageReceived(payload)
    ).subscribe()
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