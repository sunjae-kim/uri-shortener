<template>
  <form @submit.prevent="createShort">
    <input v-model="url.originalUrl" type="text" placeholder="https://original-url.com"> → 
    <span>tisha.me/</span><input v-model="url.short" type="text" placeholder="short">
    <button>Shorten!</button>
  </form>
</template>

<script>
import { mapState } from 'vuex';
import { TIMESTAMP, shortsRef } from '../database';
import { validateShort, validateUrl } from '../services/validation';

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
      const url = { ...this.url, author: displayName, uid };
      const { error, value } = validateUrl(url);
      if (error) {
        this.url = defaultUrl();
        return alert('입력하신 양식이 올바르지 않습니다 😭');
      }
      await shortsRef.child(value.short).set(value);
      this.url = defaultUrl();
    },
  }
}
</script>
