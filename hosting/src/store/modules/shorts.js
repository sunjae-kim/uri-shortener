import { firebaseAction } from 'vuexfire';
import { shortsRef } from '@/database';

const state = {
  loading: true,
  data: {},
};

const getters = {
  orderedShorts: function(state, _, rootState) {
    return Object.values(state.data)
      .sort((a, b) => b.createdAt - a.createdAt)                // 시간 순 정렬
      .filter(short => short.uid === rootState.user.data.uid);  // 로그인 유저의 short 만 보기
  },
};

const mutations = {
  setShortsLoading: function(state, loading) {
    state.loading = loading;
  },
};

const actions = {
  bindShorts: firebaseAction(async (context) => {
    await context.bindFirebaseRef('data', shortsRef);
    context.commit('setShortsLoading', false);
  }),
};

export default {
  state,
  getters,
  mutations,
  actions,
};
