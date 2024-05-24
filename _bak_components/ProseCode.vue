<template>
  <div>
    <a @click="show = !show" class="inline-flex items-baseline cursor-pointer bg-slate-100 dark:bg-zinc-600/30 px-2
      hover:bg-slate-200 duration-150">
      <span>{{ show ? '▼' : '►' }} Code</span>
    </a>
    <Transition name="slide-fade">
      <div v-if="show" class="duration-150">
        <slot />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const show = ref(false)

defineProps({
  code: {
    type: String,
    default: ''
  },
  language: {
    type: String,
    default: null
  },
  filename: {
    type: String,
    default: null
  },
  highlights: {
    type: Array as () => number[],
    default: () => []
  },
  meta: {
    type: String,
    default: null
  }
})
</script>
<style>
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