<template>
  <component
    :is="ImageComponent"
    :src="refinedSrc"
    :alt="props.alt"
    :width="props.width"
    :height="props.height"
  />
</template>

<script setup lang="ts">
import { withTrailingSlash, withLeadingSlash, joinURL } from 'ufo'
import { useRuntimeConfig, computed } from '#imports'

import ImageComponent from '#build/mdc-image-component.mjs'

const runtimeCf = useRuntimeConfig()
const imgServer = runtimeCf.public.imgServer
const imgCDN = runtimeCf.public.imgCDN

const props = defineProps({
  src: {
    type: String,
    default: ''
  },
  alt: {
    type: String,
    default: 'LYP IMG'
  },
  width: {
    type: [String, Number],
    default: undefined
  },
  height: {
    type: [String, Number],
    default: undefined
  }
})

const refinedSrc = computed(() => {

  if (imgServer !== null && imgServer.trim() !== '') {
    if (imgCDN !== null && imgCDN.trim() !== '') {

      if (props.src.indexOf(".webp") > 0 || props.src.indexOf(".gif") > 0) {
        return imgCDN + '/' + imgServer + props.src + '?org_if_sml=1';
      } else {
        return imgCDN + '/' + imgServer + props.src + '?force_format=webp,jpeg&org_if_sml=1';
      }
    }
    return imgServer + props.src;
  }

  if (props.src?.startsWith('/') && !props.src.startsWith('//')) {
    const _base = withLeadingSlash(withTrailingSlash(useRuntimeConfig().app.baseURL))
    if (_base !== '/' && !props.src.startsWith(_base)) {
      return joinURL(_base, props.src)
    }
  }
  return props.src
})
</script>