<template>
  <a :href="href"
    target="_blank"
    @mouseenter="showTooltip = true"
    @mouseleave="showTooltip = false"
    class="inline relative font-bold cursor-pointer underline underline-offset-4 decoration-pink-500 dark:decoration-indigo-500 dark:text-zinc-400">
    <slot />
    <MyTooltip :txt="href" :show="showTooltip" />
</a>
</template>
<script setup>
const showTooltip = ref(false)
defineProps({
  href: {
    default: ''
  }
})
</script>