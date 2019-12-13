<template>
  <sui-container id="not-found" text-align="center">
    <section class="centered-screen">
      <h1 is="sui-header">
        요청하신 페이지를 찾을 수 없습니다.
        <sui-header-subheader v-if="keyword">{{ keyword | formatKeywordInKorean }} 등록되지 않은 경로입니다.</sui-header-subheader>
      </h1>
      <router-link to="/">지금 경로 등록하러 가기</router-link>
    </section>
  </sui-container>
</template>

<script>
import { formatKeywordInKorean } from '@/utils/josa';

export default {
  name: 'Invalid',
  props: {
    keyword: String,
  },
  filters: {
    formatKeywordInKorean,
  },
};
</script>

<style>
#not-found > h1 {
  margin-bottom: 2rem;
}
</style>