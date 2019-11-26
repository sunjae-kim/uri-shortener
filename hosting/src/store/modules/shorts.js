import { firebaseAction } from 'vuexfire';

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
  setLoading: function(state, loading) {
    state.loading = loading;
  },
};

const actions = {
  bindShorts: firebaseAction(async (context, shortsRef) => {
    await context.bindFirebaseRef('data', shortsRef);
    context.commit('setLoading', false);
  }),
};

export default {
  state,
  getters,
  mutations,
  actions,
};
