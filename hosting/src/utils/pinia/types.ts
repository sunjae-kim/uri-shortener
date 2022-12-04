import 'pinia'
import { RouteLocationNormalizedLoaded, Router } from 'vue-router'

declare module 'pinia' {
  export interface PiniaCustomProperties {
    router: Router
    route: RouteLocationNormalizedLoaded
  }
}
