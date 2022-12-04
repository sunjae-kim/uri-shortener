<template>
  <div v-if="!loading" class="ui container">
    <router-view />
  </div>
  <teleport v-else to="body">
    <div class="ui active dimmer inverted">
      <div class="ui text loader">사용자 정보를 가져오는 중입니다..</div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { mapActions, mapState } from 'vuex'

export default {
  name: 'App',
  computed: {
    ...mapState('user', ['loading']),
  },
  methods: {
    ...mapActions('user', ['onAuthStateChanged']),
  },
  created () {
    this.onAuthStateChanged()
  },
}
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s !important;
}
.fade-enter,
.fade-leave-to {
  opacity: 0 !important;
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
