import { auth } from '@/database'
import router from '@/router'
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithRedirect,
} from 'firebase/auth'
import { Module } from 'vuex'
import { RootState } from '..'

export type UserState = {
  loading: boolean
  data: {
    uid: string
    email: string
    displayName: string
  }
}

const module: Module<UserState, RootState> = {
  namespaced: true,
  state () {
    return {
      loading: true,
      data: { uid: '', email: '', displayName: '' },
    }
  },
  getters: {
    isLoggedIn (state) {
      return !!state.data.uid
    },
  },
  mutations: {
    setUser (state, userData) {
      state.data = userData
    },
    clearUser (state) {
      state.data = { displayName: '', email: '', uid: '' }
    },
    setUserLoading (state, loading) {
      state.loading = loading
    },
  },
  actions: {
    async signOut ({ commit }) {
      commit('setUserLoading', true)
      commit('clearUser')
      auth.signOut()
    },
    signInWithGoogle () {
      const provider = new GoogleAuthProvider()
      signInWithRedirect(auth, provider)
    },
    redirect ({ getters, dispatch }) {
      // const { path } = router.currentRoute.value
      // if (getters.isLoggedIn) {
      //   dispatch('shortList/bindShortList', null, { root: true })
      //   if (path !== '/') router.push('/')
      // }
      // if (!getters.isLoggedIn && path !== '/login') router.push('/login')
    },
    onAuthStateChanged ({ commit, dispatch }) {
      onAuthStateChanged(auth, user => {
        if (user) {
          const { uid, email, displayName } = user
          const userData = { uid, email, displayName }
          commit('setUser', userData)
        }
        commit('setUserLoading', false)
        dispatch('redirect')
      })
    },
  },
}

export default module
