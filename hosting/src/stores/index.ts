import { createStore } from 'vuex'
import { vuexfireMutations } from 'vuexfire'
import modules from './modules'
import { ShortListState } from './modules/shortList'
import { UserState } from './modules/user'

export interface RootState {
  user: UserState
  shortList: ShortListState
}

export default createStore({
  // mutations: vuexfireMutations,
  modules,
})
