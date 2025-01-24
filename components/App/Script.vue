<!-- eslint-disable vue/valid-template-root -->
<template></template>
<script setup>
import { inject } from "vue";

const apiServer = useRuntimeConfig().public.apiServer;
const steamStatus = inject("steamStatus");
const steamGame = inject("steamGame");
const steamGameCN = inject("steamGameCN");
const steamGameID = inject("steamGameID");

const innerWidth = useDeviceWidth();
const steamTimer = ref();

// 使用 watch 来监听 innerWidth 的变化
watch(innerWidth, (newWidth, oldWidth) => {
  console.debug(`窗口宽度从 ${oldWidth} 变化为：${newWidth}`);
  useState("deviceWidth", () => newWidth);
});

const handleResize = () => {
  innerWidth.value = window.innerWidth;
};

onMounted(() => {
  handleResize();
  window.addEventListener("resize", handleResize);
  if (process.env.NODE_ENV === "production") {
    loadSteamData();
  }
  steamTimer.value = window.setInterval(() => loadSteamData(), 30000);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);

  clearInterval(steamTimer.value);
  steamTimer.value = null;
});

async function loadSteamData() {
  await $fetch(apiServer + "/api/public/steam/status")
    .then(response => {
      steamStatus.value = response?.data?.response?.players[0]?.personastate;
      steamGame.value = response?.data?.response?.players[0]?.gameextrainfo;
      steamGameCN.value = response?.data?.response?.players[0]?.gameextrainfo;
      steamGameID.value = response?.data?.response?.players[0]?.gameid;
    })
    .catch(error => {
      console.error("Error:", error);
    });
}
</script>
