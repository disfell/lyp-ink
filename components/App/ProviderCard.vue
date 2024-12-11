<template>
  <ClientOnly>
    <NuxtLink :to="obj.url" class="flex items-end gap-4 group p-2 -m-2 rounded-lg" external target="_blank">
      <div class="max-w-sm">
        <h3 class="text-sm font-medium group-hover:text-primary-600">
          {{ obj.name }}
        </h3>
        <p class="text-gray-400 dark:text-gray-500 text-sm">{{ obj.description }}</p>
      </div>
      <div class="flex-1 border-b border-dashed border-gray-300 dark:border-gray-800 group-hover:border-gray-700"></div>
      <img :alt="obj.name" :class="obj.iconIsLen ? 'h-9' : 'size-9'" :src="src" />
    </NuxtLink>
  </ClientOnly>
</template>

<script lang="ts" setup>
const props = defineProps({
  obj: {
    type: Object,
    required: true,
  },
});
const colorMode = useColorMode();

const src = computed(() => {
  return colorMode.preference === "dark" ? props.obj.iconL : props.obj.iconD;
});
</script>
