import firebase from '@/database';
import router from '@/router';

const getInitialData = () => ({
  uid: '',
  email: '',
  displayName: '',
});

const state = {
  loading: true,
  data: getInitialData(),
};

const getters = {
  isLoggedIn(state) {
    return state.data.uid ? true : false;
  },
};

const mutations = {
  setUser(state, userData) {
    state.data = userData;
  },
  clearUser(state) {
    state.data = getInitialData();
  },
  setUserLoading(state, loading) {
    state.loading = loading;
  },
};

const actions = {
  async signOut({ commit }) {
    commit('setUserLoading', true);
    commit('clearUser');
    firebase.auth().signOut();
  },
  signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
  },
  redirect({ getters, dispatch }) {
    const { path } = router.currentRoute;
    if (getters.isLoggedIn) {
      dispatch('shortList/bindShortList', null, { root: true });
      if (path != '/') router.push('/');
    }
    if (!getters.isLoggedIn && path != '/login') router.push('/login');
  },
  onAuthStateChanged({ commit, dispatch }) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const { uid, email, displayName } = user;
        const userData = { uid, email, displayName };
        commit('setUser', userData);
      }
      commit('setUserLoading', false);
      dispatch('redirect');
    });
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true,
};
