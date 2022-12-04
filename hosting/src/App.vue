<template>
  <div v-if="!loadingStore.state" class="ui container">
    <router-view />
  </div>
  <teleport v-else to="body">
    <div class="ui active dimmer inverted">
      <div class="ui text loader">{{ loadingStore.message }}</div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { useLoadingStore } from './stores/loading'
import useShortStore from './stores/short'
import useUserStore from './stores/user'

export default {
  name: 'App',
  setup () {
    const loadingStore = useLoadingStore()
    const shortStore = useShortStore()
    const userStore = useUserStore()
    shortStore.init()
    userStore.init()

    return { loadingStore }
  },
}
</script>

<style>
/* Global */
body {
  overflow-y: overlay;
}
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

::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}
::-webkit-scrollbar-track {
  background-color: transparent;
}
::-webkit-scrollbar-thumb {
  background-color: #dedede;
  border-radius: 20px;
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
