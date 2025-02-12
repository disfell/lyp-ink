<!-- eslint-disable vue/valid-template-root -->
<template></template>
<script setup>
import colors from "tailwindcss/colors";
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

  const colorKeys = Object.keys(colors);
  const randomIndex = Math.floor(Math.random() * colorKeys.length);
  const randomKey = colorKeys[randomIndex];
  const initialShades = colors[randomKey];
  for (const shade in initialShades) {
    document.documentElement.style.setProperty(`--color-primary-${shade}`, hexToRgb(initialShades[shade]));
  }
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

function hexToRgb(hex) {
  // 移除 '#' 并校验格式
  hex = hex.replace(/^#/, "");
  if (hex.length !== 3 && hex.length !== 6) {
    return "Invalid hex color";
  }

  // 如果是 3 位十六进制，补齐为 6 位
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map(c => c + c)
      .join("");
  }

  // 解析 RGB 值
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return `${r} ${g} ${b}`;
}
</script>
