import type { App, Plugin } from 'vue'
import VCalendar from '@/VCalendar.vue'

export { VCalendar }

const plugin: Plugin = {
  install (app: App) {
    app.component('VCalendar', VCalendar)
  }
}

export default plugin
