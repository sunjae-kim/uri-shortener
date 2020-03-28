<template>
  <sui-form id="shorten-form" @submit.prevent="onFormSubmit">
    <sui-form-field required>
      <label>Original URI</label>
      <sui-input
        v-model="formData.originalUri"
        placeholder="https://original-uri.com"
      />
    </sui-form-field>
    <sui-form-field required>
      <label>Shortening Keyword</label>
      <div class="ui labeled action input left icon">
        <i id="input--label" class="icon">tisha.me/</i>
        <input
          v-model="formData.keyword"
          type="text"
          placeholder="등록할 키워드를 입력하세요."
        />
        <button type="submit" class="ui blue button">Shorten!</button>
      </div>
    </sui-form-field>
    <span @click="generateKeyword" class="mini ui basic button">
      <i class="random icon"></i>
      Random generate
    </span>
  </sui-form>
</template>

<script>
import { mapActions } from 'vuex';
import { randomStr } from '@/utils';

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
    generateKeyword() {
      this.formData.keyword = randomStr();
    },
  },
};
</script>
<style>
#shorten-form {
  margin-bottom: 3rem;
  margin-top: 2rem;
}

#input--label {
  line-height: 2.86;
  margin-left: 1em;
  font-weight: 600;
  font-size: 1em;
  opacity: 0.9;
}

#input--label + input {
  padding-left: 5.3em !important;
}
</style>
