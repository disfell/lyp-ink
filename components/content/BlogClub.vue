<template>
  <div class="flex flex-wrap gap-4">
    <NuxtLink v-for="link in useAppConfig().blogClub" :key="link.name" :to="link.url" target="_blank">
      <UTooltip :ui="{ popper: { strategy: 'absolute' } }" :text="link.name">
        <img v-if="link.iconL || link.iconD" v-lazy-image="colorMode.preference === 'dark' ? link.iconL : link.iconD" alt="" class="max-w-6 my-0" />
      </UTooltip>
    </NuxtLink>
  </div>
</template>

<script lang="ts" setup>
const colorMode = useColorMode();
</script>
