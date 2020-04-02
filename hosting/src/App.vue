<template>
  <sui-container v-if="!loading" id="app">
    <router-view />
  </sui-container>
  <sui-dimmer v-else active inverted>
    <sui-loader content="사용자 정보를 가져오는 중입니다.." />
  </sui-dimmer>
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
  created() {
    const { current, pending } = this.$router.history;
    if (pending && pending.name === 'invalid') return;
    if (current && current.name === 'invalid') return;
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

/* SweetAlert2 Overring */
.swal2-styled.swal2-cancel {
  color: rgba(0, 0, 0, 0.7) !important;
  box-shadow: 0 0 0 1px rgba(34, 36, 38, 0.15) inset;
  background: none !important;
}
</style>
