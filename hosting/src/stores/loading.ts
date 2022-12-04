import { defineStore } from 'pinia'

type State = {
  state: boolean
  message: string
}

export const useLoadingStore = defineStore('loading', {
  state (): State {
    return {
      state: false,
      message: '',
    }
  },
})
