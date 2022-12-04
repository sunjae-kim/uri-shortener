import { shortListRef } from '@/database'
import axios from 'axios'
import { child, get, onValue, remove, set } from 'firebase/database'
import { defineStore } from 'pinia'
import { Short } from '../../../types/entity'
import { useLoadingStore } from './loading'
import useUserStore from './user'

type State = {
  data: { [keyword: string]: Short }
}

const useShortStore = defineStore('short-list', {
  state (): State {
    return {
      data: {},
    }
  },
  getters: {
    // TODO: 추후 user space로 데이터 분리
    list (): Short[] {
      const userStore = useUserStore()
      const user = userStore.state.data
      if (!user) return []
      return Object.values(this.data)
        .sort((a, b) => b.createdAt - a.createdAt)
        .filter(short => short.uid === user.uid)
    },
  },
  actions: {
    init () {
      onValue(shortListRef, snapshot => {
        const data = (snapshot.toJSON() || {}) as { [keyword: string]: Short }
        this.data = data
      })
    },
    async create (p: { keyword: string; originalUri: string }) {
      const loadingStore = useLoadingStore()
      try {
        loadingStore.$patch({
          state: true,
          message: '데이터를 생성하는 중입니다..',
        })

        const userStore = useUserStore()
        const user = userStore.state.data
        if (!user) throw new Error('세션이 만료됐습니다. 다시 로그인해주세요')

        const { keyword, originalUri } = p
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
          createdAt: Date.now(),
          author: user.displayName,
          uid: user.uid,
        }

        await set(child(shortListRef, keyword), data)
        return { isSuccessful: true, payload: { keyword } }
      } catch (error) {
        return { isSuccessful: false, payload: { error } }
      } finally {
        loadingStore.$reset()
      }
    },
    async delete (p: { keyword: string }) {
      const loadingStore = useLoadingStore()
      try {
        loadingStore.$patch({
          state: true,
          message: '데이터를 삭제하는 중입니다..',
        })
        const { keyword } = p
        await remove(child(shortListRef, keyword))
        return { isSuccessful: true, payload: { keyword } }
      } catch (error) {
        return { isSuccessful: false, payload: { error } }
      } finally {
        loadingStore.$reset()
      }
    },
    async update (p: {
      keyword: string
      originalUri: string
      short: Short
    }) {
      console.log(p)
      const loadingStore = useLoadingStore()
      try {
        loadingStore.$patch({
          state: true,
          message: '데이터를 수정하는 중입니다..',
        })

        const { keyword, originalUri, short } = p
        if (!originalUri) throw Error('줄이고자 하는 URI 를 입력해주세요')
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

        const data = { ...short, ...response.data }

        await remove(child(shortListRef, short.keyword))
        await set(child(shortListRef, keyword), data)
        return { isSuccessful: true, payload: { keyword } }
      } catch (error) {
        return { isSuccessful: false, payload: { error } }
      } finally {
        loadingStore.$reset()
      }
    },
  },
})

export default useShortStore
