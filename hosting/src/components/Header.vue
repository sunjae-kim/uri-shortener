<template>
  <header v-if="user.loading">Loading...</header>
  <header v-else>
    <div v-if="isLoggedIn">
      <span>Welcome! {{ user.data.displayName }}!</span>
      <button @click="signOut">Sign out</button>
    </div>
    <button
      v-else
      id="signin-with-google"
      @click="signInWithGoogle">
      Sign in with google
    </button>
  </header>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Header',
  computed: {
    ...mapGetters([
      'isLoggedIn',
    ])
  },
  mounted: function() {
    this.onAuthStateChanged();
  },
  methods: {
    ...mapActions([
      'signOut',
      'signInWithGoogle',
      'onAuthStateChanged',
    ]),
  }
};
</script>
