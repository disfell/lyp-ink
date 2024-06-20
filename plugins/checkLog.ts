export default defineNuxtPlugin((nuxtApp) => {
  // Vue 3 中使用 Vue.config.warnHandler
  nuxtApp.vueApp.config.warnHandler = (msg, vm, trace) => {
    if (msg.includes("Hydration class mismatch")) {
      // 忽略特定的警告
      console.log("Ignoring hydration class mismatch warning")
      return
    }
    // 打印其他警告
    console.error(`[Vue warn]: ${msg}`)
    if (trace) {
      console.error(trace)
    }
  }
})
