<template>
  <sui-container id="header" text-align="right">
    <sui-button v-if="isLoggedIn" size="mini" @click="signOut"
      >Sign out</sui-button
    >
    <h1 size="huge" is="sui-header" text-align="center">
      <sui-image :src="assets.logo" size="small" />tisha.me
    </h1>
  </sui-container>
</template>

<script lang="ts">
import assets from '@/assets'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'AppHeader',
  data () {
    return { assets }
  },
  computed: {
    ...mapGetters('user', ['isLoggedIn']),
  },
  methods: {
    ...mapActions('user', ['signOut']),
  },
}
</script>

<style>
#header {
  margin: 1rem 0;
}
</style>
