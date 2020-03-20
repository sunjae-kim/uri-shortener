<template>
  <sui-container v-if="!isLoggedIn" id="login">
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
};
</script>

<style></style>
