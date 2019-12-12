<template>
  <div>
    <Header />
    <ShortenForm />
    <ShortList />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ClipboardJS from 'clipboard';
import router from '@/router';
import ShortenForm from '@/components/ShortenForm.vue';
import ShortList from '@/components/ShortList.vue';
import Header from '@/components/Header.vue';

export default {
  name: 'Home',
  components: {
    ShortenForm,
    ShortList,
    Header,
  },
  computed: {
    ...mapGetters('user', ['isLoggedIn']),
  },
  methods: {
    ...mapActions('shortList', ['bindShortList']),
  },
  created() {
    if (!this.isLoggedIn) return router.push('/login');
  },
  mounted() {
    this.bindShortList();
    new ClipboardJS('.copy_btn');
  },
};
</script>

<style>
</style>