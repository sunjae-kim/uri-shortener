<template>
  <form v-on:submit.prevent="createShort">
    <input v-model="url.originalUrl" type="text" placeholder="https://original-url.com"> → 
    <span>tisha.me/</span><input v-model="url.short" type="text" placeholder="short">
    <button v-on:click="createShort">Shorten!</button>
  </form>
</template>

<script>
import { TIMESTAMP, shortsRef } from '../database';

const defaultUrl = () => ({
  originalUrl: '',
  short: '',
  author: 'Annonymous',
  createdAt: TIMESTAMP,
})

export default {
  name: 'ShortForm',
  data () {
    return {
      url: defaultUrl(),
    }
  },
  methods: {
    createShort: async function () {
      await shortsRef.child(this.url.short).set(this.url);
      this.url = defaultUrl();
    },
  }
}
</script>
