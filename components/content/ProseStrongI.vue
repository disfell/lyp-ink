<template>
  <component 
    :is="isComponent" 
    :class="[props.class, 'inline-flex items-baseline font-bold rounded-md jelly-effect px-1']">
    <slot />
  </component>
</template>
<script setup>
const isComponent = 'div'

const props = defineProps({
  class: {
    type: [String, Number],
    default: undefined
  }
})
</script>