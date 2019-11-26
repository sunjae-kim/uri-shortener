<template>
  <div id="app">
    <Header />
    <hr>
    <div v-if="user.data.uid">
      <ShortForm />
      <hr>
      <Shorts />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import ClipboardJS from 'clipboard'; new ClipboardJS('.btn');
import ShortForm from '@/components/ShortForm.vue';
import Shorts from '@/components/Shorts.vue';
import Header from '@/components/Header.vue';

export default {
  name: 'App',
  computed: {
    ...mapState({
      user: 'user'
    })
  },
  methods: {
    ...mapActions([
      'bindShorts'
    ]),
  },
  mounted: function() {
    this.bindShorts();
  },
  components: {
    ShortForm,
    Shorts,
    Header,
  }
};
</script>
