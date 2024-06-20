<template>
  <div>
    <Transition name="slide">
      <div v-if="showNav"
        @mouseenter="mouseentering = true"
        @mouseleave="mouseentering = false"
        class="my-sidenav fixed right-3 bottom-1/4">
        <div>
          <div class="bg-slate-50 dark:bg-gray-400 grid place-content-center rounded-md cursor-pointer shadow-md">
            <button  @click="scrollToTop">
              <svg class="w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75 12 3m0 0 3.75 3.75M12 3v18" />
              </svg>
            </button>
          </div>
        </div>
        <div class="mt-3">
          <div class="bg-slate-50 dark:bg-gray-400 grid place-content-center rounded-md cursor-pointer shadow-md">
            <NuxtLink @click="$router.back()" noPrefetch>
              <svg class="w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
              </svg>
            </NuxtLink>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>
<script setup>
const showTime = ref(5000)
const lastScrollY = ref(0)
const scrollTimeout = ref()
const mouseentering = ref(false)
const showNav = ref(false)
const isTopBtnVisible = ref(false)
const animationFrameId = ref() // 用于存储requestAnimationFrame的ID

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
  // 滚动时隐藏按钮
  isTopBtnVisible.value = false
}

function handleScroll() {
  if (mouseentering.value) {
    window.clearTimeout(scrollTimeout.value)
    showNav.value = true
  } else {
    watchScrolling()
  }
  watchScrollToTop()
}

function watchScrollToTop() {
  if (animationFrameId.value) {
    // 如果已经有一个动画帧在队列中，取消它
    cancelAnimationFrame(animationFrameId.value)
  }
  animationFrameId.value = requestAnimationFrame(() => {
    // 这里放置实际的滚动逻辑
    isTopBtnVisible.value = window.scrollY > 100 // 根据需要调整触发显示的阈值
  })
}

function watchScrolling() {
  showNav.value = true
  const currentScrollY = window.scrollY;
  const isScrollingUp = currentScrollY < lastScrollY.value
  const isScrollingDown = currentScrollY > lastScrollY.value

  // 更新 lastScrollY 的值以便于下次滚动时使用
  lastScrollY.value = currentScrollY

  // 根据滚动方向执行相应操作
  if (isScrollingUp) {
  } else if (isScrollingDown) {
  }

  window.clearTimeout(scrollTimeout.value) // 重置定时器
  scrollTimeout.value = window.setTimeout(() => {
    // 检查滚动是否停止
    if (window.scrollY === lastScrollY.value) {
      // 执行停止滚动时的逻辑
      showNav.value = false
    }
  }, showTime.value)
}
onMounted(() => {
  window.addEventListener("scroll", handleScroll)
})

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll)
})
</script>

<style scoped>
.my-sidenav {
  transform: translateX(-30%);
  transition: transform 1s ease-in-out;
}
@keyframes slideLeft {
  from {
    opacity: 0;
    transform: translateX(0%);
  }
  to {
    opacity: 1;
    transform: translateX(-30%);
  }
}
.slide-enter-active {
  animation: slideLeft 1s;
}
.slide-leave-active {
  animation: slideLeft 1s reverse;
}
</style>
