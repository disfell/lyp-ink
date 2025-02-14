<template>
  <UTooltip :ui="{ popper: { strategy: 'absolute' } }" text="">
    <button
      class="relative px-3 py-4 flex items-center justify-center transition hover:text-primary-500 dark:hover:text-primary-400"
      @click="changeDarkState">
      <Icon :name="colorMode.preference === 'dark' ? 'solar:sun-2-outline' : 'solar:moon-outline'" aria-hidden="true" class="w-5 h-5" />
      <span class="sr-only"></span>
    </button>
  </UTooltip>
</template>
<script setup>
import { useStorage } from "@vueuse/core";
const colorMode = useColorMode();

onMounted(() => {
  const themeIsDark = useStorage("theme-dark");
  if (themeIsDark.value === undefined) {
    themeIsDark.value = "light";
  }
  colorMode.preference = themeIsDark.value;
});

function changeDarkState() {
  const themeIsDark = useStorage("theme-dark");
  colorMode.preference = themeIsDark.value === "dark" ? "light" : "dark";
  themeIsDark.value = colorMode.preference;
}
</script>
