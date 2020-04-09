<template>
  <header class="container">
    <Button v-if="isLoggedIn" class="mini" text="Sign out" />
    <Logo />
  </header>
</template>

<script>
import Logo from '@/components/atoms/Logo.vue';
import Button from '@/components/atoms/Button.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Header',
  components: {
    Logo,
    Button,
  },
  computed: {
    ...mapGetters('user', ['isLoggedIn']),
  },
  methods: {
    ...mapActions('user', ['signOut']),
  },
};
</script>

<style>
header {
  margin: 1rem 0;
  text-align: right;
}
</style>
