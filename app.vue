<template>
  <!-- class="grayscale" 哀悼灰 -->
  <div @contextmenu.prevent>
    <Body class="antialiased dark:bg-neutral-800" />
    <div v-show="loading">
      <Transition>
        <div class="grid place-items-center h-screen">
          <LazyMyLoading />
        </div>
      </Transition>
    </div>
    <div v-show="!loading">
      <Transition>
        <LazyNuxtPage />
      </Transition>
    </div>
  </div>
</template>
<script setup>
import config from './package.json'

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

// console.log(
//   `%c Build by %c Nuxt${config.devDependencies.nuxt} %c Tailwindcss${config.devDependencies.tailwindcss}`,
//   'background:#35495e ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff',
//   'background:#41b883 ; padding: 1px; color: #fff',
//   'background-color: rgb(96 165 250); padding: 1px; border-radius: 0 3px 3px 0;  color: #fff',
//   // 'background:transparent'
// )

const nuxtApp = useNuxtApp()
const loading = ref(false)
nuxtApp.hook("page:start", () => {
  loading.value = true;
})
nuxtApp.hook("page:finish", () => {
  loading.value = false;
})

</script>
<!-- <style>
.blur-up {
  -webkit-filter: blur(5px);
  filter: blur(5px);
  transition: filter 400ms, -webkit-filter 400ms;
}
</style> -->

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