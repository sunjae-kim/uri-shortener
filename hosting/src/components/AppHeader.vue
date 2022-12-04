<template>
  <div class="ui right aligned container" id="header">
    <button v-if="isLoggedIn" class="mini ui button" @click="signOut">
      Sign out
    </button>
    <h1 class="ui huge center aligned header">😸 tisha.me</h1>
  </div>
</template>

<script lang="ts">
import assets from '@/assets'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'AppHeader',
  data () {
    return { assets }
  },
  computed: {
    ...mapGetters('user', ['isLoggedIn']),
  },
  methods: {
    ...mapActions('user', ['signOut']),
  },
}
</script>

<style>
#header {
  padding: 1rem 0;
}
</style>
