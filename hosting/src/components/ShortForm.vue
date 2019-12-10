<template>
  <sui-form id="form" @submit.prevent="onFormSubmit">
    <sui-form-field>
      <sui-input v-model="data.originalUrl" placeholder="https://original-uri.com" />
    </sui-form-field>
    <sui-form-field>
      <div class="ui labeled action input">
        <div class="ui label">tisha.me/</div>
        <input v-model="data.short" type="text" placeholder="키워드를 입력하세요" />
        <button class="ui blue button">Short!</button>
      </div>
    </sui-form-field>
  </sui-form>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { TIMESTAMP, shortsRef } from '@/database';

const getDefaultData = () => ({
  originalUrl: '',
  short: '',
  author: '',
  uid: '',
  createdAt: TIMESTAMP
});

export default {
  name: 'ShortForm',
  data: () => ({
    data: getDefaultData(),
  }),
  computed: {
    ...mapState(['shorts'])
  },
  methods: {
    ...mapActions(['createShort']),
    async onFormSubmit() {
      const isSuccessful = await this.createShort(this.data);
      if (isSuccessful) this.data = getDefaultData();
    }
  }
};
</script>
<style>
#form {
  margin-bottom: 3rem;
  margin-top: 2rem;
}

/* Message fade */
.fade-enter-active, .fade-leave-active {
  transition: opacity 2s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
