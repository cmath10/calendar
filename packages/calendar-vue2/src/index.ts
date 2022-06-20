import type { PluginObject } from 'vue'
import VCalendar from '@/VCalendar.vue'

export { VCalendar }

const plugin: PluginObject<undefined> = {
  install (Vue) {
    Vue.component('VCalendar', VCalendar)
  }
}

export default plugin
