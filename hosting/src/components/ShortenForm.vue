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
      <div class="ui labeled input left icon">
        <i id="input--label" class="icon">tisha.me/</i>
        <input
          v-model="formData.keyword"
          type="text"
          placeholder="등록할 키워드를 입력하세요."
        />
      </div>
    </sui-form-field>
    <div class="form-btns">
      <span @click="generateKeyword" class="mini ui basic button">
        <i class="random icon"></i>
        Random generate
      </span>
      <button class="mini ui button primary">
        Shorten!
      </button>
    </div>
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
  line-height: inherit;
  margin-left: 1em;
  padding: 0.678571em 0;
  font-family: inherit;
  font-weight: normal;
  font-size: 1em;
  opacity: 0.7;
}

#input--label + input {
  padding-left: 5.2em !important;
  font-weight: normal;
}

.form-btns {
  display: flex;
  justify-content: flex-end;
}
.form-btns > span:last-child {
  margin-right: 0px;
}
</style>
