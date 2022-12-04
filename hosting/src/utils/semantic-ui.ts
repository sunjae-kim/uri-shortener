import { App } from 'vue'
import 'semantic-ui-css/semantic.min.css'
import * as SuiVue from 'semantic-ui-vue'

export default {
  install (app: App) {
    app.use(SuiVue as any)
  },
}
