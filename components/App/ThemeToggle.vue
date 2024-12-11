<template>
  <UTooltip :ui="{ popper: { strategy: 'absolute' } }" text="">
    <button
      class="relative px-3 py-4 flex items-center justify-center transition hover:text-primary-500 dark:hover:text-primary-400"
      @click="isDark = !isDark">
      <Icon :name="colorMode.preference === 'dark' ? 'solar:sun-2-outline' : 'solar:moon-outline'" aria-hidden="true" class="w-5 h-5" />
      <span class="sr-only"></span>
    </button>
  </UTooltip>
</template>
<script setup>
const colorMode = useColorMode();

const isDark = computed({
  get() {
    return colorMode.preference === "dark";
  },
  set() {
    colorMode.preference = colorMode.preference === "dark" ? "light" : "dark";
  },
});
</script>
