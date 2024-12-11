<template>
  <div>
    <h2 class="uppercase text-xs font-semibold text-gray-400 mb-4">加入他们</h2>
    <div class="space-y-5">
      <NuxtLink
        v-for="link in useAppConfig().blogClub"
        :key="link.name"
        :to="link.url"
        class="flex items-end gap-4 dark:hover:text-gray-300 group"
        external
        target="_blank">
        <span class="text-sm">
          {{ link.name }}
        </span>
        <div class="flex-1 border-b border-dashed border-gray-300 dark:border-gray-800 group-hover:border-gray-700"></div>
        <img v-if="link.iconL || link.iconD" :alt="link.name" :src="colorMode.preference === 'dark' ? link.iconL : link.iconD" class="max-h-6" />
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
const colorMode = useColorMode();
</script>
