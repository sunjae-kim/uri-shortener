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
  uid: '',
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
      const { displayName, uid } = this.user.data;
      this.url = { ...this.url, author: displayName, uid };
      await shortsRef.child(this.url.short).set(this.url);
      this.url = defaultUrl();
    },
  }
}
</script>
