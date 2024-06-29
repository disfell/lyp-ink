<template>
  <div class="flex justify-center b-height my-8">
    <div class="flex items-stretch justify-center z-50 rounded-lg">
      <NuxtLink to="/" class="text-6xl py-2
        bg-clip-text text-transparent bg-gradient-to-r
        from-amber-500 to-stone-800 dark:from-stone-100 dark:to-stone-500
        font-black band-font">
        {{ appConfig.title }}
      </NuxtLink>
    </div>
  </div>
</template>
<script setup>
const appConfig = useAppConfig()
</script>
<style>
.b-height {
  height: 5.2rem;
}
</style>