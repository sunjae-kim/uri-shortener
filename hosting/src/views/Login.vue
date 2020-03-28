<template>
  <sui-container v-if="!isLoggedIn" id="login">
    <section class="centered-screen">
      <Header />
      <button
        id="google-login-btn"
        class="ui basic button"
        @click="signInWithGoogle"
      >
        <img :src="googleImage" />
        Sign in with Google
      </button>
    </section>
  </sui-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Header from '@/components/Header.vue';

export default {
  name: 'Login',
  data: () => ({
    googleImage: require('public/google.png').default,
  }),
  components: {
    Header,
  },
  computed: {
    ...mapGetters('user', ['isLoggedIn']),
  },
  methods: {
    ...mapActions('user', ['signInWithGoogle']),
  },
};
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
