<template>
  <sui-container v-if="!isLoggedIn" id="login">
    <section class="centered-screen">
      <AppHeader />
      <button
        id="google-login-btn"
        class="ui basic button"
        @click="signInWithGoogle"
      >
        <img :src="assets.google" />
        Sign in with Google
      </button>
    </section>
  </sui-container>
</template>

<script lang="ts">
import assets from '@/assets'
import AppHeader from '@/components/AppHeader.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Login',
  data () {
    return { assets }
  },
  components: {
    AppHeader,
  },
  computed: {
    ...mapGetters('user', ['isLoggedIn']),
  },
  methods: {
    ...mapActions('user', ['signInWithGoogle']),
  },
}
</script>

<style>
#google-login-btn {
  display: flex;
  align-items: center;
}
#google-login-btn > img {
  height: 20px;
  margin-right: 7px;
}
</style>
