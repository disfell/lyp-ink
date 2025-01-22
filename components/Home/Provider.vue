<template>
  <div>
    <h2 class="uppercase text-xs font-semibold text-gray-400 mb-6">power by</h2>
    <div class="flex flex-wrap gap-4">
      <NuxtLink v-for="link in useAppConfig().provider" :key="link.name" :to="link.url" target="_blank">
        <img
          v-if="link.iconL || link.iconD"
          :alt="link.name"
          :src="colorMode.preference === 'dark' ? link.iconL : link.iconD"
          :class="link.iconIsLen ? 'h-9' : 'size-9'" />
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
const colorMode = useColorMode();
</script>
