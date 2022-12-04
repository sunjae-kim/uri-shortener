<template>
  <div class="ui right aligned container" id="header">
    <button
      v-if="userStore.state.data"
      class="mini ui button"
      @click="userStore.signOut"
    >
      Sign out
    </button>
    <h1 class="ui huge center aligned header">😸 tisha.me</h1>
  </div>
</template>

<script lang="ts">
import useUserStore from '@/stores/user'

export default {
  name: 'AppHeader',
  setup () {
    const userStore = useUserStore()
    return { userStore }
  },
}
</script>

<style>
#header {
  padding: 1rem 0;
}
</style>
