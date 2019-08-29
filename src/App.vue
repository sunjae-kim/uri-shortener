<template>
  <div id="app">
    <ShortForm />
    <hr>
    <Shorts />
  </div>
</template>

<script>
import ClipboardJS from 'clipboard'; new ClipboardJS('.btn');
import { shortsRef } from './database';
import ShortForm from "./components/ShortForm.vue";
import Shorts from "./components/Shorts.vue";

export default {
  name: "App",
  created () {
    this.$store.dispatch('bindShorts', shortsRef);
  },
  components: {
    ShortForm,
    Shorts,
  }
};
</script>
