<template>
  <div class="ui container" v-if="!userStore.state.data" id="login">
    <section class="centered-screen">
      <AppHeader />
      <button
        id="google-login-btn"
        class="ui basic button"
        @click="userStore.signInWithGoogle"
      >
        <img :src="googleLogo" />
        Sign in with Google
      </button>
    </section>
  </div>
</template>

<script lang="ts">
import assets from '@/assets'
import AppHeader from '@/components/AppHeader.vue'
import useUserStore from '@/stores/user'

export default {
  name: 'Login',
  components: { AppHeader },
  setup () {
    const userStore = useUserStore()
    return {
      userStore,
      googleLogo: assets.google,
    }
  },
}
</script>

<style>
#google-login-btn {
  display: flex;
  align-items: center;
}
#google-login-btn > img {
  height: 20px;
  margin-right: 7px;
}
</style>
