<template>
  <div>
    <Header />
    <ShortForm />
    <ShortList />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ClipboardJS from 'clipboard';
import router from '@/router';
import ShortForm from '@/components/ShortForm.vue';
import ShortList from '@/components/ShortList.vue';
import Header from '@/components/Header.vue';

export default {
  name: 'Home',
  components: {
    ShortForm,
    ShortList,
    Header
  },
  computed: {
    ...mapGetters(['isLoggedIn'])
  },
  methods: {
    ...mapActions(['bindShorts']),
  },
  mounted() {
    if (!this.isLoggedIn) router.push('/login');
    new ClipboardJS('.copy_btn');
    this.bindShorts();
  }
};
</script>

<style>
</style>