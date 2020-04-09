<template>
  <transition name="fade">
    <div class="ui basic label">{{ text }}</div>
  </transition>
</template>

<script>
export default {
  name: 'Label',
  props: {
    text: String,
  },
};
</script>

<style scoped>
div {
  position: absolute !important;
  margin: 0;
}
</style>
