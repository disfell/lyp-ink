<template></template>
<script setup lang="ts">
const innerWidth = useDeviceWidth();

// 使用 watch 来监听 innerWidth 的变化
watch(innerWidth, (newWidth, oldWidth) => {
  console.debug(`窗口宽度从 ${oldWidth} 变化为：${newWidth}`);
  useState<number>('deviceWidth', () => newWidth);
});

const handleResize = () => {
  innerWidth.value = window.innerWidth;
};

onMounted(() => {
  handleResize();
  window.addEventListener('resize', handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
});
</script>