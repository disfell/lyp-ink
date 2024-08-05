<template>
  <strong :class="chooseClass">
    <slot />
  </strong>
</template>
<script setup>
import { inject } from "vue";
const state = inject("state");
const props = defineProps({
  type: {
    default: "",
  },
});

const chooseClass = ref("");
const map = {
  default: "font-bold rounded cursor-pointer dark:text-zinc-400",
  sky: "font-bold rounded cursor-pointer bg-sky-100 dark:bg-sky-950/60 dark:text-zinc-400 p-1 mx-1 text-sm",
  green:
    "font-bold rounded cursor-pointer bg-green-100 dark:bg-green-950/60 dark:text-zinc-400 p-1 mx-1 text-sm",
  lime: "font-bold rounded cursor-pointer bg-lime-100 dark:bg-lime-950/60 dark:text-zinc-400 p-1 mx-1 text-sm",
  emerald:
    "font-bold rounded cursor-pointer bg-emerald-100 dark:bg-emerald-950/60 dark:text-zinc-400 p-1 mx-1 text-sm",
  teal: "font-bold rounded cursor-pointer bg-teal-100 dark:bg-teal-950/60 dark:text-zinc-400 p-1 mx-1 text-sm",
  cyan: "font-bold rounded cursor-pointer bg-cyan-100 dark:bg-cyan-950/60 dark:text-zinc-400 p-1 mx-1 text-sm",
  indigo:
    "font-bold rounded cursor-pointer bg-indigo-100 dark:bg-indigo-950/60 dark:text-zinc-400 p-1 mx-1 text-sm",
  violet:
    "font-bold rounded cursor-pointer bg-violet-100 dark:bg-violet-950/60 dark:text-zinc-400 p-1 mx-1 text-sm",
  purple:
    "font-bold rounded cursor-pointer bg-purple-100 dark:bg-purple-950/60 dark:text-zinc-400 p-1 mx-1 text-sm",
};

if (props.type) {
  chooseClass.value = props.type;
} else {
  chooseClass.value = map[state.color];
}
</script>
