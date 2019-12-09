<template>
  <sui-form id="form" @submit.prevent="createShort">
    <sui-form-field>
      <sui-input v-model="data.originalUrl" placeholder="https://original-url.com" />
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
import Swal from 'sweetalert2';
import { mapState } from 'vuex';
import { TIMESTAMP, shortsRef } from '@/database';
import { validateData } from '@/services/validation';

const getDefaultData = () => ({
  originalUrl: '',
  short: '',
  author: '',
  uid: '',
  createdAt: TIMESTAMP
});

export default {
  name: 'ShortForm',
  data() {
    return {
      data: getDefaultData()
    };
  },
  computed: {
    ...mapState({
      user: 'user'
    })
  },
  methods: {
    createShort: async function() {
      const { displayName, uid } = this.user.data;
      const data = { ...this.data, author: displayName, uid };
      const { error, value } = validateData(data);
      if (error) {
        return Swal.fire({
          icon: 'error',
          title: 'Failed',
          text: '입력한 값이 양식에 맞지 않습니다'
        });
      }
      await shortsRef.child(value.short).set(value);
      this.data = getDefaultData();
      Swal.fire({
        icon: 'success',
        title: 'tishe.me/' + data.short,
        text: '성공적으로 생성되었습니다'
      });
    }
  }
};
</script>
<style>
#form {
  margin-bottom: 5rem;
  margin-top: 2rem;
}
</style>