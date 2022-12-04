<template>
  <section id="short-list">
    <teleport v-if="loading.state" to="body">
      <div class="ui active dimmer inverted">
        <div class="ui text loader">{{ loading.message }}</div>
      </div>
    </teleport>
    <li class="ui divided list">
      <ul v-for="short in shortList" class="item" :key="short.keyword">
        <ShortListItem :short="short" />
      </ul>
      <p v-if="shortList.length === 0">
        위 폼을 통해 첫번째 URI를 만들어 보세요!
      </p>
    </li>
  </section>
</template>

<script lang="ts">
import ShortListItem from '@/components/ShortListItem.vue'
import { useLoadingStore } from '@/stores/loading'
import useShortStore from '@/stores/short'
const loadingStore = useLoadingStore()
const shortStore = useShortStore()

export default {
  name: 'ShortList',
  components: {
    ShortListItem,
  },
  computed: {
    loading () {
      return loadingStore.$state
    },
    shortList () {
      return shortStore.list
    },
  },
}
</script>

<style>
section#short-list {
  margin: 3rem 0;
}
</style>
