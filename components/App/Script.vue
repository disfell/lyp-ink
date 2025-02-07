<!-- eslint-disable vue/valid-template-root -->
<template></template>
<script setup>
import { inject } from "vue";

const apiServer = useRuntimeConfig().public.apiServer;
const steamStatus = inject("steamStatus");
const steamGame = inject("steamGame");
const steamGameCN = inject("steamGameCN");
const steamGameID = inject("steamGameID");
const steamTimer = ref();

onMounted(() => {
  if (process.env.NODE_ENV === "production") {
    loadSteamData();
  }
  steamTimer.value = window.setInterval(() => loadSteamData(), 30000);
});

onBeforeUnmount(() => {

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
