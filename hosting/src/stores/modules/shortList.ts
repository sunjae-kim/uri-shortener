import { shortListRef } from '@/database'
import axios from 'axios'
import { child, get, remove, set } from 'firebase/database'
import { Module } from 'vuex'
import { firebaseAction } from 'vuexfire'
import { RootState } from '..'
import { Short } from '../../../../types/entity'

export type ShortListState = {
  loading: { status: boolean; message: string }
  data: Record<string, Short>
}

const module: Module<ShortListState, RootState> = {
  namespaced: true,
  state () {
    return {
      loading: { status: true, message: '데이터를 가져오는 중입니다..' },
      data: {},
    }
  },
  getters: {
    orderedShortList (state, getters, { user }) {
      return Object.values(state.data)
        .sort((a, b) => b.createdAt - a.createdAt)
        .filter(short => short.uid === user.data.uid)
    },
    metaData (state, getters, { user: { data } }) {
      return {
        author: data.displayName,
        uid: data.uid,
        createdAt: Date.now(),
      }
    },
  },
  mutations: {
    setShortsLoading (state, payload) {
      state.loading = payload
    },
  },
  actions: {
    // bindShortList: firebaseAction(async ({ commit, bindFirebaseRef }) => {
    //   await bindFirebaseRef('data', shortListRef)
    //   commit('setShortsLoading', { status: false, message: '' })
    // }),
    async createShort ({ commit, getters }, { originalUri, keyword }) {
      try {
        commit('setShortsLoading', {
          status: true,
          message: '데이터를 생성하는 중입니다..',
        })

        if (!originalUri) throw Error('줄이고자 하는 URI를 입력해주세요')
        if (!keyword) throw Error('등록할 키워드를 입력해주세요')

        const snapshot = await get(child(shortListRef, keyword))

        if (snapshot.exists()) {
          throw Error('이미 등록된 키워드입니다')
        }

        const SERVER_IP = import.meta.env.VITE_SERVER_IP
        const response = await axios.post(`${SERVER_IP}/validate-short`, {
          originalUri: encodeURI(originalUri),
          keyword,
        })

        const data = {
          ...response.data,
          ...getters.metaData,
        }

        await set(child(shortListRef, keyword), data)
        commit('setShortsLoading', { status: false, message: '' })
        return { isSuccessful: true, payload: { keyword } }
      } catch (error) {
        commit('setShortsLoading', { status: false, message: '' })
        return { isSuccessful: false, payload: { error } }
      }
    },
    async deleteShort ({ commit }, path) {
      commit('setShortsLoading', {
        status: true,
        message: '데이터를 삭제하는 중입니다..',
      })
      await remove(child(shortListRef, path))
      commit('setShortsLoading', { status: false, message: '' })
    },
    async updateShort ({ commit }, [short, [keyword, originalUri]]) {
      try {
        commit('setShortsLoading', {
          status: true,
          message: '데이터를 수정하는 중입니다..',
        })

        if (!originalUri) throw Error('줄이고자 하는 URI 를 입력해주세요')
        if (!keyword) throw Error('등록할 키워드를 입력해주세요')

        const snapshot = await get(child(shortListRef, keyword))
        if (keyword !== short.keyword && snapshot.exists()) {
          throw Error('이미 등록된 키워드입니다')
        }

        const SERVER_IP = import.meta.env.VITE_SERVER_IP
        const response = await axios.post(`${SERVER_IP}/validate-short`, {
          originalUri: encodeURI(originalUri),
          keyword,
        })

        const data = {
          ...short,
          ...response.data,
        }

        await remove(child(shortListRef, short.keyword))
        await set(child(shortListRef, keyword), data)
        commit('setShortsLoading', { status: false, message: '' })
        return { isSuccessful: true, payload: { keyword } }
      } catch (error) {
        commit('setShortsLoading', { status: false, message: '' })
        return { isSuccessful: false, payload: { error } }
      }
    },
  },
}

export default module
