import type { RouterConfig } from '@nuxt/schema'
import { createMemoryHistory } from 'vue-router'

// https://router.vuejs.org/api/interfaces/routeroptions.html
export default <RouterConfig> {
    history: base => process.client ? createMemoryHistory(base) : null /* default */
}
