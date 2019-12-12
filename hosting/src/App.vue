<template>
  <sui-dimmer v-if="loading" active inverted>
    <sui-loader content="사용자 정보를 가져오는 중입니다.." />
  </sui-dimmer>
  <sui-container v-else id="app">
    <router-view />
  </sui-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'App',
  computed: {
    ...mapState('user', ['loading']),
  },
  methods: {
    ...mapActions('user', ['onAuthStateChanged']),
  },
  mounted() {
    this.onAuthStateChanged();
  },
};
</script>

<style>
/* Global */
.text-wrap {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.m-0 {
  margin: 0 !important;
}
.centered-screen {
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