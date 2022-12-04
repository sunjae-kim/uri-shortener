<template>
  <div class="ui container" id="not-found" text-align="center">
    <section class="centered-screen">
      <h1 class="ui header">요청하신 페이지를 찾을 수 없습니다.</h1>
      <router-link to="/">지금 "{{ keyword }}" 경로 등록하러 가기</router-link>
    </section>
  </div>
</template>

<script lang="ts">
import { useAppRoute } from '@/utils/router'
import { ROUTE_NAMES } from '@/utils/router/types'

export default {
  name: 'Invalid',
  computed: {
    keyword () {
      const route = useAppRoute<ROUTE_NAMES.INVALID>()
      return route.query.keyword
    },
  },
}
</script>
