<template>
  <UTooltip :ui="{ popper: { strategy: 'absolute' } }" text="" class="hidden sm:inline-block">
    <ULink class="relative flex items-center justify-center mt-1">
      <img v-lazy-image="'/fun/2.gif'" alt="" class="size-8" />
    </ULink>
  </UTooltip>
  <UTooltip :ui="{ popper: { strategy: 'absolute' } }" text="" class="hidden sm:inline-block">
    <ULink class="relative flex items-center justify-center mt-1">
      <img v-lazy-image="'/fun/3.gif'" alt="" class="size-8" />
    </ULink>
  </UTooltip>
  <UTooltip :ui="{ popper: { strategy: 'absolute' } }" text="">
    <ULink class="relative flex items-center justify-center mt-1">
      <img v-lazy-image="'/fun/4.gif'" alt="" class="size-8" />
    </ULink>
  </UTooltip>
  <UTooltip :ui="{ popper: { strategy: 'absolute' } }" text="">
    <ULink class="relative flex items-center justify-center mt-1">
      <img v-lazy-image="'/fun/5.gif'" alt="" class="size-8" />
    </ULink>
  </UTooltip>
</template>
