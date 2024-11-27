<template>
  <ClientOnly>
    <NuxtLink
      class="flex items-end gap-4 group p-2 -m-2 rounded-lg"
      :to="obj.url"
      target="_blank"
      external
    >
      <div class="max-w-sm">
        <h3 class="text-sm font-medium group-hover:text-primary-600">
          {{ obj.name }}
        </h3>
        <p class="text-gray-400 text-sm">{{ obj.description }}</p>
      </div>
      <div
        class="flex-1 border-b border-dashed border-gray-300 dark:border-gray-800 group-hover:border-gray-700"
      ></div>
      <UAvatar
        :src="isDark ? obj.iconD : obj.iconL"
        :ui="{ rounded: 'rounded z-10 relative' }"
        size="md"
        :alt="obj.name"
      />
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
const isDark = computed({
  get () {
    return colorMode.value === 'dark';
  },
  set () {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
  }
})
</script>
