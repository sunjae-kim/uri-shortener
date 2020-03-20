<template>
  <sui-container id="not-found" text-align="center">
    <section class="centered-screen">
      <h1 is="sui-header">
        요청하신 페이지를 찾을 수 없습니다.
        <sui-header-subheader v-if="keyword"
          >{{ keyword | applyJosa }} 등록되지 않은
          경로입니다.</sui-header-subheader
        >
      </h1>
      <router-link to="/">지금 경로 등록하러 가기</router-link>
    </section>
  </sui-container>
</template>

<script>
import { applyJosa, replaceURI } from '@/utils';

export default {
  name: 'Invalid',
  props: {
    keyword: String,
  },
  filters: {
    applyJosa,
  },
  created() {
    replaceURI(this.keyword);
  },
};
</script>

<style></style>
