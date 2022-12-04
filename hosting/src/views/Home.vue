<template>
  <div v-if="user.state.data">
    <AppHeader />
    <ShortenForm />
    <ShortList />
  </div>
</template>

<script lang="ts">
import ClipboardJS from 'clipboard'
import ShortenForm from '@/components/ShortenForm.vue'
import ShortList from '@/components/ShortList.vue'
import AppHeader from '@/components/AppHeader.vue'
import useUserStore from '@/stores/user'

export default {
  name: 'Home',
  components: {
    ShortenForm,
    ShortList,
    AppHeader,
  },
  setup () {
    const userStore = useUserStore()
    return {
      clipboardJs: new ClipboardJS('.copy_btn'),
      user: userStore,
    }
  },
}
</script>

<style></style>
