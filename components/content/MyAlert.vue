<script setup>
defineProps(['type'])
</script>

<template>
  <div :class="[type]">
    <ContentSlot :use="$slots.default" unwrap="p" />
  </div>
</template>

<style>
.warning {
  border-radius: 10px;
  padding: 20px;
  background-color: #ff9800;
  color: white;
  margin-bottom: 15px;
}

.warning strong {
  color: white;
}

@media (prefers-color-scheme: dark) {
  .warning {
    border-radius: 10px;
    padding: 20px;
    background-color: #ae6800;
    color: white;
    margin-bottom: 15px;
  }

  .warning strong {
    color: white;
  }
}
</style>