<template>
  <div id="app">
    <Header />
    <hr>
    <div v-if="isLoggedIn">
      <ShortForm />
      <hr>
      <Shorts />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ClipboardJS from 'clipboard';
import ShortForm from '@/components/ShortForm.vue';
import Shorts from '@/components/Shorts.vue';
import Header from '@/components/Header.vue';

export default {
  name: 'App',
  computed: {
    ...mapGetters([
      'isLoggedIn',
    ])
  },
  methods: {
    ...mapActions([
      'bindShorts'
    ]),
  },
  mounted: function() {
    this.bindShorts();
    new ClipboardJS('.copy_btn');
  },
  components: {
    ShortForm,
    Shorts,
    Header,
  }
};
</script>
