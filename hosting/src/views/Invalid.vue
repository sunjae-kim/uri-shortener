<template></template>

<script>
import router from '@/router';

export default {
  name: 'Invalid',
  props: {
    keyword: String,
  },
  created() {
    return router.push({ path: `/${this.keyword}` });
  },
};
</script>

<style></style>
