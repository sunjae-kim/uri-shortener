<template>
  <h1 size="huge" is="sui-header" text-align="center">
    <sui-image :src="logoImage" size="small" />tisha.me
  </h1>
</template>

<script>
export default {
  name: 'Logo',
  data: () => ({
    logoImage: require('public/logo.png').default,
  }),
};
</script>

<style></style>
