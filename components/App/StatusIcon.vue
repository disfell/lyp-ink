<template>
  <UTooltip v-if="ping && $route.path !== '/'" v-motion-roll-visible-left :text="showText">
    <ULink
      active-class="text-primary-600 dark:text-primary-400"
      class="relative px-3 py-4 flex items-center justify-center transition hover:text-primary-500 dark:hover:text-primary-400">
      <img :src="showIcon" class="size-5 rounded-sm" />
      <span class="sr-only">{{ showText }}</span>
    </ULink>
  </UTooltip>
</template>
<script setup>
const steamStatus = inject("steamStatus");
const steamGameCN = inject("steamGameCN");
const steamGameID = inject("steamGameID");
const showText = ref("");
const showIcon = ref("");
const ping = ref(false);

watchEffect(() => {
  if (steamStatus.value == 1) {
    ping.value = true;
    showText.value = "Steam 在线";
    showIcon.value = "/icon/other/steam.svg";
  }
  if (steamGameID != null && steamGameID?.value != null && steamGameID?.value > 0) {
    showText.value = "TA 正在游戏中：" + steamGameCN.value;
    showIcon.value = "/icon/steam/" + steamGameID.value + ".jpg";
  }
});
</script>
