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
  setLoading: function(state, loading) {
    state.loading = loading;
  },
};

const actions = {
  signOut: async function({ commit }) {
    commit('setLoading', true);
    await firebase.auth().signOut();
    commit('clearUser');
    commit('setLoading', false);
  },
  signInWithGoogle: function({ commit }) {
    commit('setLoading', true);
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
      commit('setLoading', false);
    });
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};