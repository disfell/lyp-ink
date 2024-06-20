<template>
  <a
    :href="href"
    target="_blank"
    @mouseenter="showTooltip = true"
    @mouseleave="showTooltip = false"
    class="inline relative font-bold cursor-pointer hover:underline">
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