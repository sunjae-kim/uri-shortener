<template>
  <sui-container id="not-found" text-align="center">
    <section class="centered-screen">
      <h1 is="sui-header">
        요청하신 페이지를 찾을 수 없습니다.
        <sui-header-subheader v-if="keyword"
          >{{ applyJosa(keyword) }} 등록되지 않은
          경로입니다.</sui-header-subheader
        >
      </h1>
      <router-link to="/">지금 경로 등록하러 가기</router-link>
    </section>
  </sui-container>
</template>

<script lang="ts">
import { applyJosa, replaceURI } from '@/utils'

export default {
  name: 'Invalid',
  props: {
    keyword: String,
  },
  created () {
    if (!this.keyword) return
    replaceURI(this.keyword)
  },
  methods: {
    applyJosa,
  },
}
</script>

<style></style>
