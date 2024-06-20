<template>
  <span>
    <Transition name="slide">
      <span
        v-if="show"
        class="my-tooltip font-normal absolute bottom-0 left-0 text-zinc-500 bg-white dark:bg-zinc-500
        dark:text-white p-2 border-2 rounded-md text-xs z-50"
      >
        {{ decodeURIComponent(txt) }}
      </span>
    </Transition>
  </span>
</template>
<script setup>
// 创建响应式引用来存储鼠标的 x 坐标和是否鼠标悬停的状态
const props = defineProps({
  txt: {
    default: "",
  },
  show: {
    default: false,
  },
});
</script>

<style scoped>
.my-tooltip {
  transition: transform 0.3s ease-in-out;
  transform: translateY(100%);
  cursor: pointer;
}
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(150%);
  }
  to {
    opacity: 1;
    transform: translateY(100%);
  }
}
.slide-enter-active {
  animation: slideUp 0.3s;
}
.slide-leave-active {
  animation: slideUp 0.3s reverse;
}
</style>
