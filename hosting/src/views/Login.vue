<template>
  <sui-container id="login">
    <section class="centered-screen">
      <Header />
      <sui-button
        social="google"
        content="Sign in with Google"
        icon="google"
        @click="signInWithGoogle"
      />
    </section>
  </sui-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Header from '@/components/Header.vue';
import router from '@/router';

export default {
  name: 'Login',
  components: {
    Header,
  },
  computed: {
    ...mapGetters('user', ['isLoggedIn']),
  },
  methods: {
    ...mapActions('user', ['signInWithGoogle']),
  },
  created() {
    if (this.isLoggedIn) return router.push('/');
  },
};
</script>

<style>
</style>