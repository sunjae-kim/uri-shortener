<template>
  <sui-form id="shorten-form" @submit.prevent="onFormSubmit">
    <sui-form-field>
      <sui-input v-model="formData.originalUri" placeholder="https://original-uri.com" />
    </sui-form-field>
    <sui-form-field>
      <div class="ui labeled action input">
        <div class="ui label">tisha.me/</div>
        <input v-model="formData.keyword" type="text" placeholder="키워드를 입력하세요" />
        <button type="submit" class="ui blue button">Shorten!</button>
      </div>
    </sui-form-field>
  </sui-form>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'ShortenForm',
  data: () => ({
    formData: {
      originalUri: '',
      keyword: '',
    },
  }),
  methods: {
    ...mapActions('shortList', ['createShort']),
    async onFormSubmit() {
      const isSuccessful = await this.createShort(this.formData);
      if (isSuccessful) Object.assign(this.$data, this.$options.data());
    },
  },
};
</script>
<style>
#shorten-form {
  margin-bottom: 3rem;
  margin-top: 2rem;
}
</style>
