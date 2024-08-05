<template>
  <a
    :href="href"
    target="_blank"
    @mouseenter="showTooltip = true"
    @mouseleave="showTooltip = false"
    :class="chooseClass"
  >
    <slot />
    <MyTooltip :txt="href" :show="showTooltip" />
  </a>
</template>
<script setup>
import { inject } from "vue";
const state = inject("state");
const showTooltip = ref(false);
defineProps({
  href: {
    default: "",
  },
});

const map = {
  "": "inline relative font-bold cursor-pointer underline underline-offset-4 decoration-sky-600 dark:decoration-indigo-500/50 dark:text-zinc-400",
  sky: "inline relative font-bold cursor-pointer underline underline-offset-4 decoration-sky-600 dark:decoration-sky-500/50 dark:text-zinc-400",
  green:
    "inline relative font-bold cursor-pointer underline underline-offset-4 decoration-green-600 dark:decoration-green-500/50 dark:text-zinc-400",
  lime: "inline relative font-bold cursor-pointer underline underline-offset-4 decoration-lime-600 dark:decoration-lime-500/50 dark:text-zinc-400",
  emerald:
    "inline relative font-bold cursor-pointer underline underline-offset-4 decoration-emerald-600 dark:decoration-emerald-500/50 dark:text-zinc-400",
  teal: "inline relative font-bold cursor-pointer underline underline-offset-4 decoration-teal-600 dark:decoration-teal-500/50 dark:text-zinc-400",
  cyan: "inline relative font-bold cursor-pointer underline underline-offset-4 decoration-cyan-600 dark:decoration-cyan-500/50 dark:text-zinc-400",
  indigo:
    "inline relative font-bold cursor-pointer underline underline-offset-4 decoration-indigo-600 dark:decoration-indigo-500/50 dark:text-zinc-400",
  violet:
    "inline relative font-bold cursor-pointer underline underline-offset-4 decoration-violet-600 dark:decoration-violet-500/50 dark:text-zinc-400",
  purple:
    "inline relative font-bold cursor-pointer underline underline-offset-4 decoration-purple-600 dark:decoration-purple-500/50 dark:text-zinc-400",
};

const chooseClass = computed(() => {
  return map[state.color];
});
</script>
