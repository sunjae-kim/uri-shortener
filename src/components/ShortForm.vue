<template>
  <form @submit.prevent="createShort">
    <input v-model="data.originalUrl" type="text" placeholder="https://original-url.com"> → 
    <span>tisha.me/</span><input v-model="data.short" type="text" placeholder="short">
    <button>Shorten!</button>
  </form>
</template>

<script>
import { mapState } from 'vuex';
import { TIMESTAMP, shortsRef } from '@/database';
import { validateData } from '@/services/validation';

const getDefaultData = () => ({
  originalUrl: '',
  short: '',
  author: '',
  uid: '',
  createdAt: TIMESTAMP,
});

export default {
  name: 'ShortForm',
  data: function() {
    return {
      data: getDefaultData(),
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
      const data = { ...this.data, author: displayName, uid };
      const { error, value } = validateData(data);
      if (error) {
        this.data = getDefaultData();
        return alert('입력하신 양식이 올바르지 않습니다 😭');
      }
      await shortsRef.child(value.short).set(value);
      this.data = getDefaultData();
    },
  }
}
</script>
