import firebase from '@/database';
import router from '@/router';

const state = {
  loading: true,
  data: {
    uid: '',
    email: '',
    displayName: '',
  },
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
    state.data = { uid: '', email: '', displayName: '' };
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
  signInWithGoogle({ commit }) {
    commit('setUserLoading', true);
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
};
