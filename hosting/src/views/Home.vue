<template>
  <div v-if="isLoggedIn">
    <Header />
    <ShortenForm />
    <ShortList />
    <InfoButton />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ClipboardJS from 'clipboard';
import ShortenForm from '@/components/ShortenForm.vue';
import ShortList from '@/components/ShortList.vue';
import Header from '@/components/organisms/Header.vue';
import InfoButton from '@/components/molecules/InfoButton.vue';

export default {
  name: 'Home',
  components: {
    ShortenForm,
    ShortList,
    Header,
    InfoButton,
  },
  computed: {
    ...mapGetters('user', ['isLoggedIn']),
  },
  mounted() {
    new ClipboardJS('.copy_btn');
  },
};
</script>

<style></style>
