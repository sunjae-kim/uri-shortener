<template>
  <sui-dimmer v-if="user.loading" active inverted>
    <sui-loader content="Loading..." />
  </sui-dimmer>
  <sui-container v-else id="app">
    <router-view />
  </sui-container>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import router from '@/router';

export default {
  name: 'App',
  computed: {
    ...mapState(['user'])
  },
  methods: {
    ...mapActions(['onAuthStateChanged'])
  },
  mounted() {
    this.onAuthStateChanged();
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

/* Semantic UI Overriding */
@media only screen and (min-width: 768px) {
  #app {
    width: 723px;
    margin-left: auto !important;
    margin-right: auto !important;
  }
}
</style>