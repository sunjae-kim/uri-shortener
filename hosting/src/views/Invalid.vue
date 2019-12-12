<template>
  <sui-container id="not-found" text-align="center">
    <h1 is="sui-header">
      요청하신 페이지를 찾을 수 없습니다.
      <sui-header-subheader v-if="short">{{ getWord(short) }} 등록되지 않은 경로입니다.</sui-header-subheader>
    </h1>
    <router-link to="/">지금 경로 등록하러 가기</router-link>
  </sui-container>
</template>

<script>
import router from '@/router';
import josa from 'josa-js';

export default {
  name: 'Invalid',
  props: {
    short: String
  },
  methods: {
    getWord(short) {
      const code = short.charCodeAt(short.length - 1) - 44032;
      // 한글이 아닐 때
      if (code < 0 || code > 11171) return `"${short}" 은(는)`;
      return `"${short}" ${josa.c(short, '은/는')}`;
    }
  }
};
</script>

<style>
#not-found {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  height: 60vh;
}
#not-found > h1 {
  margin-bottom: 2rem;
}
</style>