<template>
  <div class="grid justify-items-center">
    <a :src="realSrc" data-fancybox="gallery" :data-caption="alt">
      <img :data-src="realSrc"
      :src="loading"
      data-sizes="auto"
      class="cursor-zoom-in lazyload"
      :title="alt"
      :alt="alt"
      />
    </a>
  </div>
</template>
<script>
import 'lazysizes'
import 'lazysizes/plugins/parent-fit/ls.parent-fit'
import { useAppConfig } from '#imports'

export default {
  props: {
    src: {
      type: String,
      default: ''
    },
    alt: {
      type: String,
      default: ''
    }
  },
  computed: {
    realSrc() {
      // 除了 gif，其余图片均转为 WebP
      let tmp = this.src.toLowerCase()
      let cond1 = tmp.indexOf(".gif") > 0
      let cond2 = tmp.indexOf(".webp") > 0
      let cond = cond1 || cond2
      if (cond) {
        return `${useAppConfig().cloudimg}/${this.src}`
      } else {
        return `${useAppConfig().cloudimg}/${this.src}?force_format=webp,jpeg`
      }
    },
    loading() {
      return `/loading/ghost.gif`
    }
  }
}
</script>
<style>
.lazyload,
.lazyloading {
	width: 45px;
	height: 45px;
}
</style>