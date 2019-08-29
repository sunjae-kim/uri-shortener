import { vuexfireMutations } from 'vuexfire'

export default {
  ...vuexfireMutations,

  setShortsLoading(state, loading) {
    state.shorts.loading = loading;
  },

  setUser (state, userData) {
    state.user.data = userData;
  },

  clearUser (state) {
    state.user.data = { uid: '', email: '', displayName: '' };
  },

  setUserLoading (state, loading) {
    state.user.loading = loading;
  },
};
