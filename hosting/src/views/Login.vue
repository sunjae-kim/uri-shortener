<template>
  <div id="login">
    <Header />
    <sui-button
      social="google"
      content="Sign in with Google"
      icon="google"
      @click="signInWithGoogle"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Header from '@/components/Header.vue';
import router from '@/router';

export default {
  name: 'Login',
  components: {
    Header
  },
  computed: {
    ...mapGetters(['isLoggedIn'])
  },
  methods: {
    ...mapActions(['signInWithGoogle'])
  },
  mounted() {
    if (this.isLoggedIn) router.push('/');
  }
};
</script>

<style>
#login {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  height: 60vh;
}
</style>