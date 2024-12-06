<template>
  <div class="">
    <div class="flex items-end space-x-4">
      <AppAvatar :ping="ping" :show-text="showText" :show-icon="showIcon" :avatar="appCf.site.avatar" />
    </div>

    <h1 class="mt-8 text-xl font-bold tracking-tight text-gray-800 dark:text-gray-300">Hello!</h1>
    <p class="text-gray-900">
      {{ appCf.site.intro }}
    </p>
  </div>
</template>

<script setup>
import { inject } from "vue";
const appCf = useAppConfig();
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
