/**
 * @description
 * 앱 내에서 이뤄지는 모든 라우팅을 관리하는 모듈
 * @/router 폴더 아래에 두기에는 circular dependency 이슈가 생길 듯 해서 따로 모듈로 뺌.
 */

import { RouteMap, ROUTE_NAMES } from '@/utils/router/types'
import { reactive, Ref, toRef, toRefs } from 'vue'
import { HistoryState, useRoute, useRouter } from 'vue-router'

export type TypedRouteLocationRaw<N extends ROUTE_NAMES> = {
  hash?: string
  name?: N
  query?: RouteMap[N]['query']
  params?: RouteMap[N]['params']
  /**
   * Replace the entry in the history instead of pushing a new entry
   */
  replace?: boolean
  /**
   * Triggers the navigation even if the location is the same as the current one
   */
  force?: boolean
  /**
   * State to save using the History API. This cannot contain any reactive
   * values and some primitives like Symbols are forbidden. More info at
   * https://developer.mozilla.org/en-US/docs/Web/API/History/state
   */
  state?: HistoryState
}

export const useAppRouter = () => {
  const router = useRouter()

  const push = <N extends ROUTE_NAMES>(
    params: TypedRouteLocationRaw<N> | string,
  ) => {
    return router.push(params)
  }
  const replace = <N extends ROUTE_NAMES>(
    params: TypedRouteLocationRaw<N> | string,
  ) => {
    return router.replace(params)
  }

  const resolve = <N extends ROUTE_NAMES>(
    params: TypedRouteLocationRaw<N> | string,
  ) => {
    return router.resolve(params)
  }

  return {
    ...router,
    push,
    replace,
    resolve,
  }
}

export const useAppRoute = <N extends ROUTE_NAMES>() => {
  const route = useRoute()

  return reactive({
    ...toRefs(route),
    query: toRef(route, 'query') as Ref<RouteMap[N]['query']>,
    params: toRef(route, 'params') as RouteMap[N]['params'],
  })
}

export type AppRoute<N extends ROUTE_NAMES> = ReturnType<typeof useAppRoute<N>>
