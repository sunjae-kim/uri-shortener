import firebase from '@/database';

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
    await firebase.auth().signOut();
    commit('clearUser');
    commit('setUserLoading', false);
  },
  signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
  },
  onAuthStateChanged({ commit }) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const { uid, email, displayName } = user;
        const userData = { uid, email, displayName };
        commit('setUser', userData);
      }
      commit('setUserLoading', false);
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
