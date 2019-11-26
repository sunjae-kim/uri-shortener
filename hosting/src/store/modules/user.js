import firebase from '@/database';

const state = {
  loading: true,
  data: {
    uid: '',
    email: '',
    displayName: '',
  },
};

const getters = {
  isLoggedIn: function(state) {
    return state.data.uid ? true : false;
  },
};

const mutations = {
  setUser: function(state, userData) {
    state.data = userData;
  },
  clearUser: function(state) {
    state.data = { uid: '', email: '', displayName: '' };
  },
  setUserLoading: function(state, loading) {
    state.loading = loading;
  },
};

const actions = {
  signOut: async function({ commit }) {
    commit('setUserLoading', true);
    await firebase.auth().signOut();
    commit('clearUser');
    commit('setUserLoading', false);
  },
  signInWithGoogle: function({ commit }) {
    commit('setUserLoading', true);
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
  },
  onAuthStateChanged: function({ commit }) {
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