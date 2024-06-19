<template>
  <a
    @mouseenter="showTooltip = true"
    @mouseleave="showTooltip = false" 
    :href="href" 
    target="_blank" 
    class="inline-flex items-baseline hover-a relative">
    <slot />
    <svg class="self-center w-5 h-5 rounded-full" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Zm3.75 11.625a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
    </svg>
    <Transition name="slide-fade">
      <span v-if="showTooltip"
        class="invisible md:visible absolute top-8 text-zinc-500 bg-white 
        dark:bg-zinc-500 dark:text-white p-2 border-2 rounded-md text-xs z-50">
        {{ decodeURIComponent(href) }}
      </span>
    </Transition>
  </a>
</template>
<script setup>
const showTooltip = ref(false)
defineProps({
  href: {
    default: ''
  }
})
</script>
<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>