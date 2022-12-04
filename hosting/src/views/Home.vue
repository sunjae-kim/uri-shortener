<template>
  <div v-if="isLoggedIn">
    <AppHeader />
    <ShortenForm />
    <ShortList />
    <InfoBtn />
  </div>
</template>

<script lang="ts">
import { mapGetters } from 'vuex'
import ClipboardJS from 'clipboard'
import ShortenForm from '@/components/ShortenForm.vue'
import ShortList from '@/components/ShortList.vue'
import InfoBtn from '@/components/InfoBtn.vue'
import AppHeader from '@/components/AppHeader.vue'

export default {
  name: 'Home',
  data () {
    return {
      clipboardJs: null as null | ClipboardJS,
    }
  },
  components: {
    ShortenForm,
    ShortList,
    AppHeader,
    InfoBtn,
  },
  computed: {
    ...mapGetters('user', ['isLoggedIn']),
  },
  mounted () {
    this.clipboardJs = new ClipboardJS('.copy_btn')
  },
}
</script>

<style></style>
