<template>
  <header v-if="user.loading">Loading...</header>
  <header v-else>
    <div v-if="user.data.uid">
      <span>Welcome! {{ user.data.displayName }}!</span>
      <button @click="signOut">Sign out</button>
    </div>
    <button v-else id="signin-with-google" @click="signInWithGoogle">Sign in with google</button>
  </header>
</template>

<script>
import { mapState } from 'vuex';
import firebase from '../database';

export default {
  name: 'Header',
  computed: {
    ...mapState({
      user: 'user'
    })
  },
  mounted() {
    this.onAuthStateChanged();
  },
  methods: {
    signInWithGoogle() {
      this.$store.dispatch('setUserLoading', true);
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithRedirect(provider);
    },
    onAuthStateChanged() {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          const { uid, email, displayName } = user;
          const userData = { uid, email, displayName };
          this.$store.dispatch('setUser', userData);
          this.$store.dispatch('setUserLoading', false);
        } else {
          this.$store.dispatch('setUserLoading', false);
        }
      });
    },
    async signOut() {
      this.$store.dispatch('setUserLoading', true);
      await firebase.auth().signOut();
      this.$store.dispatch('clearUser');
    }
  }
};
</script>
