<template>
  <div id="info">
    <div class="info-box">
      <transition name="fade">
        <div v-show="show" class="ui basic label">
          <p>kimsj9484@gmail.com</p>
        </div>
      </transition>
      <button @click="show = !show" class="big basic circular ui icon button">
        <i class="icon info"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InfoBtn',
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
.info-box {
  position: relative;
}
.info-box > div {
  display: block;
  margin-right: 0;
  position: absolute !important;
  top: -45px;
  right: -2.5vw;
}
#info > button {
  margin: 0;
}
</style>
