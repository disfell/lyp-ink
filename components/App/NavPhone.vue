<template>
  <div>
    <div class="fixed bottom-5 right-5 z-50">
      <UButton
        square
        color="gray"
        variant="solid"
        icon="solar:menu-dots-circle-outline"
      />
    </div>
  </div>
</template>
<script setup>
const deviceWidth = useDeviceWidth();
const appCf = useAppConfig();
const items = appCf.site.menus;
const isOpen = ref(false)
</script>
