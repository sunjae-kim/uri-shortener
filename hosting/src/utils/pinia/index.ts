import { createPinia } from 'pinia'
import { markRaw } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const pinia = createPinia()

export const registerRouterToPinia = () => {
  const router = useRouter()
  const route = useRoute()

  pinia.use(({ store }) => {
    store.router = markRaw(router)
    store.route = route
  })
}

export default pinia
