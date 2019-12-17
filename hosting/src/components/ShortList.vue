<template>
  <section id="short-list">
    <sui-dimmer v-if="loading.status" active inverted>
      <sui-loader :content="loading.message" />
    </sui-dimmer>
    <sui-list v-else divided relaxed>
      <sui-list-item v-for="short in orderedShortList" :key="short.keyword">
        <ShortListItem :short="short" />
      </sui-list-item>
    </sui-list>
  </section>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import ShortListItem from '@/components/ShortListItem.vue';

export default {
  name: 'ShortList',
  components: {
    ShortListItem,
  },
  computed: {
    ...mapState('shortList', ['loading']),
    ...mapGetters('shortList', ['orderedShortList']),
  },
};
</script>

<style>
section#short-list {
  margin: 3rem 0;
}
</style>