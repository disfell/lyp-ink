<template></template>
<script setup>
import { inject } from 'vue';
const steamStatus = inject('steamStatus');
const steamGame = inject('steamGame');
const steamGameCN = inject('steamGameCN');
const steamGameID = inject('steamGameID');
const innerWidth = useDeviceWidth();
const steamTimer = ref();

// 使用 watch 来监听 innerWidth 的变化
watch(innerWidth, (newWidth, oldWidth) => {
  console.debug(`窗口宽度从 ${oldWidth} 变化为：${newWidth}`);
  useState('deviceWidth', () => newWidth);
});

const handleResize = () => {
  innerWidth.value = window.innerWidth;
};

onMounted(() => {
  handleResize();
  window.addEventListener('resize', handleResize);
  if (process.env.NODE_ENV === "production") {
    loadSteamData();
  }
  steamTimer.value = window.setInterval(() => loadSteamData(), 30000);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);

  clearInterval(steamTimer.value);
  steamTimer.value = null;
});

async function loadSteamData() {
  const data = await $fetch('/api/steam')
  steamStatus.value = data?.status;
  steamGame.value = data?.game;
  steamGameCN.value = data?.game_cn;
  steamGameID.value = data?.game_id;
}
</script>
