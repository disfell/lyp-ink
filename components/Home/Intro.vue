<template>
  <div class="">
    <div class="flex items-end space-x-4">
      <AppAvatar :avatar="appCf.site.avatar" :ping="ping" :show-icon="showIcon" :show-text="showText" />
    </div>

    <h1 class="mt-8 text-xl font-bold tracking-tight text-gray-800 dark:text-gray-300">Hello!</h1>

    <div class="prose dark:prose-invert prose-blockquote:not-italic prose-pre:bg-gray-100 dark:prose-pre:bg-gray-900 break-words">
      <ContentRenderer v-if="intro" :value="intro" class="" />
    </div>

    <div class="pt-8"></div>
    <HomeBlogClub />
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

const { data: intro } = await useAsyncData("intro", () => queryContent("/docs/intro").findOne());

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
