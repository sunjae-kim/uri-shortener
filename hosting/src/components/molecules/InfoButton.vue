<template>
  <div id="info">
    <div>
      <Label v-show="show" text="kimsj9484@gmail.com" />
      <button @click="show = !show" class="big basic circular ui icon button">
        <i class="icon info"></i>
      </button>
    </div>
  </div>
</template>

<script>
import Label from '@/components/atoms/Label.vue';

export default {
  name: 'InfoButton',
  components: {
    Label,
  },
  data: () => ({
    show: false,
  }),
};
</script>

<style>
#info {
  position: fixed;
  bottom: 3rem;
  right: 5vw;
  text-align: center;
}
#info button {
  margin: 0;
}
#info > div {
  position: relative;
}
#info .label {
  top: -45px;
  right: -2.5vw;
}
</style>
