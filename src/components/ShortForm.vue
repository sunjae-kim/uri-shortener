<template>
  <form @submit.prevent="createShort">
    <input v-model="url.originalUrl" type="text" placeholder="https://original-url.com"> → 
    <span>tisha.me/</span><input v-model="url.short" type="text" placeholder="short">
    <button @click="createShort">Shorten!</button>
  </form>
</template>

<script>
import { mapState } from 'vuex';
import { TIMESTAMP, shortsRef } from '../database';

const defaultUrl = () => ({
  originalUrl: '',
  short: '',
  author: '',
  createdAt: TIMESTAMP,
})

export default {
  name: 'ShortForm',
  data () {
    return {
      url: defaultUrl(),
    }
  },
  computed: {
    ...mapState({
      user: 'user',
    })
  },
  methods: {
    createShort: async function () {
      this.url = { ...this.url, author: this.user.data.displayName };
      await shortsRef.child(this.url.short).set(this.url);
      this.url = defaultUrl();
    },
  }
}
</script>
