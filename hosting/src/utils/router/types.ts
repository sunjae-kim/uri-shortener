export enum ROUTE_NAMES {
  HOME = 'home',
  SIGN_IN = 'sign in',
  INVALID = 'invalid',
}

export type RouteMap = {
  [ROUTE_NAMES.HOME]: {
    query: Partial<{}>
    params: {}
  }
  [ROUTE_NAMES.SIGN_IN]: {
    query: Partial<{}>
    params: {}
  }
  [ROUTE_NAMES.INVALID]: {
    query: Partial<{ keyword: string }>
    params: {}
  }
}
