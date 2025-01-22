<template>
  <div>
    <div class="flex flex-wrap gap-4">
      <NuxtLink v-for="link in useAppConfig().blogClub" :key="link.name" :to="link.url" target="_blank">
        <UTooltip :ui="{ popper: { strategy: 'absolute' } }" :text="link.name">
          <img v-if="link.iconL || link.iconD" :alt="link.name" :src="colorMode.preference === 'dark' ? link.iconL : link.iconD" class="max-h-6" />
        </UTooltip>
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
const colorMode = useColorMode();
</script>
