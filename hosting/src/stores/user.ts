import { auth } from '@/database'
import { useAppRouter } from '@/utils/router'
import { ROUTE_NAMES } from '@/utils/router/types'
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithRedirect,
  User as FirebaseUser,
} from 'firebase/auth'
import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { useLoadingStore } from './loading'

type User = Pick<FirebaseUser, 'uid' | 'email' | 'displayName'>
type State = {
  data: User | null
  initialPromise: Promise<User | null>
}

const useUserStore = defineStore('user', () => {
  const router = useAppRouter()
  const loadingStore = useLoadingStore()
  let resolveData = (_user: User | null) => {}
  const state = reactive<State>({
    data: null,
    initialPromise: new Promise(resolve => {
      resolveData = resolve
    }),
  })

  return {
    state,
    init () {
      loadingStore.$patch({
        state: true,
        message: '사용자 정보를 가져오는 중입니다..',
      })
      onAuthStateChanged(auth, user => {
        resolveData(user)
        state.data = user
        router.replace({ name: user ? ROUTE_NAMES.HOME : ROUTE_NAMES.SIGN_IN })
        loadingStore.$reset()
      })
    },
    signOut () {
      loadingStore.$patch({ state: true, message: '로그아웃 중입니다..' })
      return auth.signOut()
    },
    signInWithGoogle () {
      loadingStore.$patch({
        state: true,
        message: '로그인 중입니다..',
      })
      const provider = new GoogleAuthProvider()
      return signInWithRedirect(auth, provider)
    },
  }
})

export default useUserStore
