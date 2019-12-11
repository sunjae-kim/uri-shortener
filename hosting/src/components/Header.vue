<template>
  <header>
    <sui-container id="header" text-align="right">
      <sui-button v-if="isLoggedIn" size="mini" @click="signOut">Sign out</sui-button>
      <h1 size="huge" is="sui-header" icon text-align="center">
        <sui-image :src="logoImage" size="small" />Tisha.me
      </h1>
    </sui-container>
  </header>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';

export default {
  name: 'Header',
  data: () => ({
    logoImage: require('public/logo.png').default
  }),
  computed: {
    ...mapGetters(['isLoggedIn'])
  },
  methods: {
    ...mapActions(['signOut'])
  }
};
</script>

<style>
header {
  margin: 1rem 0;
}
</style>