<template>
  <NuxtLoadingIndicator :color="(colorMode.preference === `light` ? false : true) ? `#ffffff` : `#000000`" />
  <AppNavbar />
  <div class="h-32"></div>
  <div> {{ }}</div>
  <UContainer>
    <NuxtPage />
  </UContainer>
  <div class="h-32"></div>
  <AppFooter />
  <AppScript />
</template>

<script setup>
import { provide } from "vue";

provide("steamStatus", ref(-1));
provide("steamGame", ref(""));
provide("steamGameCN", ref(""));
provide("steamGameID", ref(-1));
provide("steamGameList", ref({ data: [], loaded: false }));
provide("bookmarks", ref({ data: [], loaded: false }));

const colorMode = useColorMode();
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.2s;
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}

.page-enter-from {
  opacity: 0;
  transform: translateY(5px);
}
</style>
