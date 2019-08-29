import { vuexfireMutations } from 'vuexfire'

export default {
  ...vuexfireMutations,

  setShortsLoading(state, loading) {
    state.shorts.loading = loading
  }
};
