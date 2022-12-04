import App from '@/App.vue'
import router from '@/router'
import store from '@/stores'
import { createApp } from 'vue'
import 'semantic-ui-css/semantic.min.css'

const app = createApp(App)

app.use(router)
app.use(store)

app.mount('#app')
