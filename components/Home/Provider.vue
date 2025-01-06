<template>
  <div>
    <h2 class="uppercase text-xs font-semibold text-gray-400 mb-6">power by</h2>
    <div class="space-y-4">
      <AppProviderCard v-for="link in links" :key="link.name" :obj="link" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const links = useAppConfig().provider;
</script>
