<template>
  <div @contextmenu.prevent :class="`${appConfig.mourn ? 'grayscale' : ''}`">
    <Body class="antialiased dark:bg-neutral-800" />
    <div v-show="loading">
      <Transition>
        <div class="grid place-items-center h-screen">
          <LazyMyLoading />
        </div>
      </Transition>
    </div>
    <div v-show="!loading">
      <LazyNuxtPage />
    </div>
    <MySideNav />
    <MyChannel />
  </div>
</template>
<script setup>
import { reactive, provide } from 'vue'
import 'lazysizes'
import 'lazysizes/plugins/parent-fit/ls.parent-fit'
import "@fontsource/noto-sans"

const appConfig = useAppConfig()

const state = reactive({
  steamGames: [],
  linkfrom: '/'
})
// 提供 state 以便在其他组件中使用
provide('state', state)

onUnmounted(()=>{
  Fancybox.close()
  Fancybox.destroy()
})

onMounted(() => {
  // Fancybox
  Fancybox.bind('[data-fancybox="gallery"]', {
    Thumbs: {
      type: "classic",
      showOnStart: false,
    },
    Toolbar: {
      display: {
        left: ["infobar"],
        middle: [
          "zoomIn",
          "zoomOut",
          "rotateCCW",
          "rotateCW",
        ],
        right: ["thumbs", "close"],
      },
    },
  })

  // light & dark
  lod()
  let lightMedia = window.matchMedia('(prefers-color-scheme: light)')
  let darkMedia = window.matchMedia('(prefers-color-scheme: dark)')
  if (typeof darkMedia.addEventListener === 'function' || typeof lightMedia.addEventListener === 'function') {
    lightMedia.addEventListener('change', (() => lod()))
    darkMedia.addEventListener('change', (() => lod()))
  }
})

function lod() {
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.classList.remove('light')
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
    document.documentElement.classList.add('light')
  }
}

const nuxtApp = useNuxtApp()
const loading = ref(false)
nuxtApp.hook("page:start", () => {
  loading.value = true;
})
nuxtApp.hook("page:finish", () => {
  loading.value = false;
})
</script>
<style>
.loading{
  z-index: 9999;
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>