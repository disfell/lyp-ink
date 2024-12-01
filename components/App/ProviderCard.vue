<template>
  <ClientOnly>
    <NuxtLink class="flex items-end gap-4 group p-2 -m-2 rounded-lg" :to="obj.url" target="_blank" external>
      <div class="max-w-sm">
        <h3 class="text-sm font-medium group-hover:text-primary-600">
          {{ obj.name }}
        </h3>
        <p class="text-gray-400 text-sm">{{ obj.description }}</p>
      </div>
      <div class="flex-1 border-b border-dashed border-gray-300 dark:border-gray-800 group-hover:border-gray-700"></div>
      <img :src="colorMode.value === 'dark' ? obj.iconL : obj.iconD" :alt="obj.name" :class="obj.iconIsLen ? 'h-9' : 'size-9'" />
    </NuxtLink>
  </ClientOnly>
</template>

<script setup lang="ts">
defineProps({
  obj: {
    type: Object,
    required: true,
  },
});
const colorMode = useColorMode();
</script>
