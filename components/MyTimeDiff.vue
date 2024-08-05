<template>
  <div class="text-stone-400 text-xs md:text-sm text-center">
    {{ formattedTime }}
  </div>
</template>
<script setup>
// 格式化时间显示
const formattedTime = ref();
// 设置初始日期
const startDate = ref(new Date("2019-07-01"));

// 计算时间差并更新状态
const updateTimeDifference = () => {
  const currentDate = new Date();
  const timeDiff = currentDate - startDate.value;
  const seconds_ = Math.floor(timeDiff / 1000);

  const years = Math.floor(seconds_ / (3600 * 24 * 365.25));
  const months = Math.floor(
    (seconds_ % (3600 * 24 * 365.25)) / (3600 * 24 * 30.44)
  );
  const days = Math.floor((seconds_ % (3600 * 24 * 30.44)) / (3600 * 24));
  const hours = Math.floor((seconds_ % (3600 * 24)) / 3600);
  const minutes = Math.floor((seconds_ % 3600) / 60);
  const seconds = Math.floor(seconds_ % 60);

  return { years, months, days, hours, minutes, seconds };
};

// 定时器
let intervalId;
onMounted(() => {
  intervalId = setInterval(() => {
    const { years, months, days, hours, minutes, seconds } =
      updateTimeDifference();
    formattedTime.value = `${years} 年 ${months} 月 ${days} 日 ${hours} 时 ${minutes} 分 ${seconds} 秒`;
  }, 1000);
});

onUnmounted(() => {
  clearInterval(intervalId);
});
</script>
