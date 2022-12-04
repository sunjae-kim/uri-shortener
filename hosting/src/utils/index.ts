// TODO: 조사 구현
export const applyJosa = (keyword: string) => {
  return keyword
}

export const replaceURI = (path: string) => {
  window.history.replaceState({}, document.title, '/' + (path || '404'))
}

export const randomStr = () => Math.random().toString(36).substring(2, 7)
