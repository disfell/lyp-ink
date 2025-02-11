<template>
  <UTooltip :popper="{ placement: 'right' }" :text="showText">
    <div class="flex items-center rounded-full cursor-pointer backdrop-blur-3xl size-16" data-animate="" style="--stagger: 2">
      <span class="relative flex size-full">
        <span :class="ping ? 'online-ping' : ''" class="bg-green-600 absolute inline-flex size-full rounded-full z-0"> </span>
        <img v-if="ping" :src="showIcon" alt="status" class="size-6 inline-flex absolute rounded-md z-50 -bottom-1 -right-1" />
        <img
          v-lazy-image="avatar"
          alt="LYP"
          class="ring-1 border ring-gray-200 border-gray-300 dark:ring-white/10 dark:border-gray-800 transition-all duration-300 bg-gray-200 dark:bg-gray-900 rounded-full size-full cursor-pointer z-40"
          format="webp" />
      </span>
    </div>
  </UTooltip>
</template>
<script setup>
defineProps({
  ping: {
    type: Boolean,
    required: false,
    default: false,
  },
  showIcon: {
    type: String,
    required: false,
    default: "",
  },
  avatar: {
    type: String,
    required: false,
    default: "",
  },
  showText: {
    type: String,
    required: false,
    default: "",
  },
});
</script>
<style>
@keyframes online-ping {
  75%,
  100% {
    transform: scale(1.3);
    opacity: 0;
  }
}

.online-ping {
  animation: online-ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
}
</style>
