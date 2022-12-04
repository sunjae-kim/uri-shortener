<template>
  <section id="short-list">
    <teleport v-if="loading.status" to="body">
      <div class="ui active dimmer inverted">
        <div class="ui text loader">{{ loading.message }}</div>
      </div>
    </teleport>
    <li class="ui divied relaxed list">
      <ul v-for="short in orderedShortList" class="item" :key="short.keyword">
        <ShortListItem :short="short" />
      </ul>
      <p v-if="orderedShortList.length === 0">
        위 폼을 통해 첫번째 URI를 만들어 보세요!
      </p>
    </li>
  </section>
</template>

<script lang="ts">
import { mapState, mapGetters } from 'vuex'
import ShortListItem from '@/components/ShortListItem.vue'

export default {
  name: 'ShortList',
  components: {
    ShortListItem,
  },
  computed: {
    ...mapState('shortList', ['loading']),
    ...mapGetters('shortList', ['orderedShortList']),
  },
}
</script>

<style>
section#short-list {
  margin: 3rem 0;
}
</style>
