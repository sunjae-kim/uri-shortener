<template>
  <section id="shorts">
    <sui-dimmer v-if="shorts.loading" active inverted>
      <sui-loader content="Loading..." />
    </sui-dimmer>
    <sui-list v-else divided relaxed>
      <sui-list-item v-for="short in orderedShorts" :key="short.id">
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
    ShortListItem
  },
  computed: {
    ...mapState(['shorts']),
    ...mapGetters(['orderedShorts'])
  }
};
</script>

<style>
section#shorts {
  margin: 3rem 0;
}
</style>