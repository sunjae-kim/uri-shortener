import App from '@/App.vue'
import router from '@/router'
import store from '@/stores'
import { createApp } from 'vue'
import semanticUI from './utils/semantic-ui'
import 'semantic-ui-css/semantic.min.css'
import * as SuiVue from 'semantic-ui-vue'

const app = createApp(App)

app.use(semanticUI)
app.use(router)
app.use(store)
app.use(SuiVue as any)

app.mount('#app')
