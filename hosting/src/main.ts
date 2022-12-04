import App from '@/App.vue'
import router from '@/router'
import 'semantic-ui-css/semantic.min.css'
import { createApp } from 'vue'
import pinia from './utils/pinia'

const app = createApp(App)

app.use(router)
app.use(pinia)

app.mount('#app')
