<template>
  <sui-dimmer v-if="user.loading" active inverted>
    <sui-loader content="Loading..." />
  </sui-dimmer>
  <sui-container v-else id="app">
    <div v-if="isLoggedIn">
      <Header />
      <ShortForm />
      <ShortList />
    </div>
    <div v-else id="login">
      <Header />
      <sui-button
        social="google"
        content="Sign in with Google"
        icon="google"
        @click="signInWithGoogle"
      />
    </div>
  </sui-container>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import ClipboardJS from 'clipboard';
import ShortForm from '@/components/ShortForm.vue';
import ShortList from '@/components/ShortList.vue';
import Header from '@/components/Header.vue';

export default {
  name: 'App',
  computed: {
    ...mapState(['user']),
    ...mapGetters(['isLoggedIn'])
  },
  methods: {
    ...mapActions(['bindShorts', 'signInWithGoogle', 'onAuthStateChanged'])
  },
  mounted() {
    this.bindShorts();
    new ClipboardJS('.copy_btn');
    this.onAuthStateChanged();
  },
  components: {
    ShortForm,
    ShortList,
    Header
  }
};
</script>

<style>
.text_wrap {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.m0 {
  margin: 0 !important;
}

#login {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  height: 60vh;
}

/* Semantic UI Overriding */
@media only screen and (min-width: 768px) {
  #app {
    width: 723px;
    margin-left: auto !important;
    margin-right: auto !important;
  }
}
</style>