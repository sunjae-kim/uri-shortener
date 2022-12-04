<template>
  <form id="shorten-form" class="ui form" @submit.prevent="onFormSubmit">
    <div class="required field">
      <label>Original URI</label>
      <div class="ui input">
        <input
          type="text"
          v-model="formData.originalUri"
          placeholder="https://original-uri.com"
        />
      </div>
    </div>
    <div class="required field">
      <label>Shortening Keyword</label>
      <div class="ui labeled input left icon">
        <i id="input-label" class="icon">tisha.me/</i>
        <input
          v-model="formData.keyword"
          type="text"
          placeholder="등록할 키워드를 입력하세요."
        />
      </div>
    </div>
    <div class="form-btns">
      <span @click="generateKeyword" class="mini ui basic button">
        <i class="random icon"></i>
        Random generate
      </span>
      <button class="mini ui button primary">Shorten!</button>
    </div>
  </form>
</template>

<script lang="ts">
import useShortStore from '@/stores/short'
import Swal from 'sweetalert2'
const ShortStore = useShortStore()

export default {
  name: 'ShortenForm',
  data: () => ({
    formData: {
      originalUri: '',
      keyword: '',
    },
  }),
  methods: {
    async onFormSubmit () {
      const { isSuccessful, payload } = await ShortStore.create(this.formData)
      if (isSuccessful) {
        await Swal.fire({
          title: `tishe.me/${payload.keyword}`,
          html: '성공적으로 생성되었습니다',
          icon: 'success',
          scrollbarPadding: false,
        })
        this.$data.formData.keyword = ''
        this.$data.formData.originalUri = ''
      } else {
        const error = payload.error as any
        await Swal.fire({
          title: '오류',
          html: error.response ? error.response.data.message : error.message,
          icon: 'error',
          scrollbarPadding: false,
        })
      }
    },
    generateKeyword () {
      this.formData.keyword = Math.random().toString(36).substring(2, 7)
    },
  },
}
</script>
<style>
#shorten-form {
  margin-bottom: 3rem;
  margin-top: 2rem;
}

#input-label {
  line-height: inherit;
  margin-left: 1em;
  padding: 0.678571em 0;
  font-family: inherit;
  font-weight: normal;
  font-size: 1em;
  opacity: 0.7;
}

#input-label + input {
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
