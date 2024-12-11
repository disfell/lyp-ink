<template>
  <div>
    <h2 class="text-sm font-semibold">{{ title }}</h2>
    <p class="text-gray-500 text-sm">
      {{ description }}
    </p>
    <div class="mt-2 border dark:border-white/10 rounded-lg shadow-sm overflow-hidden">
      <div class="p-2 flex items-center gap-2 border-b dark:border-white/10">
        <div class="flex items-center w-full">
          <UButton
            :class="{ 'active-tab': tab === 'preview' }"
            class="relative hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300"
            color="white"
            label="Preview"
            size="xs"
            variant="soft"
            @click="tab = 'preview'" />
          <UButton
            :class="{ 'active-tab': tab === 'code' }"
            class="relative hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300"
            color="white"
            label="Code"
            size="xs"
            variant="soft"
            @click="tab = 'code'" />
          <UButton
            v-if="showUsageTab"
            :class="{ 'active-tab': tab === 'usage' }"
            class="relative hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300"
            color="white"
            label="Usage"
            size="xs"
            variant="soft"
            @click="tab = 'usage'" />
          <UButton
            v-if="showCreditTab"
            :class="{ 'active-tab': tab === 'credit' }"
            class="relative hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300"
            color="white"
            label="Credits"
            size="xs"
            variant="soft"
            @click="tab = 'credit'" />
        </div>
      </div>
      <div>
        <div v-if="tab === 'preview'" class="bg-gray-100 dark:bg-gray-900 overflow-hidden">
          <slot name="preview" />
        </div>
        <slot v-if="tab === 'code'" name="codebase" />
        <slot v-if="tab === 'usage'" name="usage" />
        <slot v-if="tab === 'credit'" name="credit" />
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  description: String,
  showUsageTab: {
    type: Boolean,
    default: true,
  },
  showCreditTab: {
    type: Boolean,
    default: false,
  },
});

const tab = ref("preview");
</script>

<style scoped>
.active-tab {
  @apply after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-primary-500 after:bottom-[-9px] after:left-0 after:pointer-events-none;
}
</style>
