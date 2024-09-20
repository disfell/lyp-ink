<template>
  <div :class="chooseClass">
    <slot />
  </div>
</template>
<script setup>
const props = defineProps({
  type: {
    default: "info",
  },
});
const map = {
  info: "bg-blue-100 border-2 border-blue-400 px-6 dark:bg-transparent dark:border-blue-300",
  warning:
    "bg-amber-100 border-2 border-amber-400 px-6 dark:bg-transparent dark:border-amber-300",
  danger:
    "bg-red-100 border-2 border-red-400 px-6 dark:bg-transparent dark:border-red-500",
  success:
    "bg-green-100 border-2 border-green-400 px-6 dark:bg-transparent dark:border-green-300",
};

const chooseClass = computed(() => {
  return map[props.type];
});
</script>
