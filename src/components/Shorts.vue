<template>
  <section id="shorts">
    <p v-if="shorts.loading">Loading...</p>
    <ul v-else>
      <li v-for="short in orderedShorts" :key="short.originalUrl">
        <div>
          <p><span>{{ short.originalUrl }}</span></p>
          &rarr; <span>https://tisha.me/{{ short.short }}</span>
          <button class="btn" v-bind:data-clipboard-text="'https://tisha.me/' + short.short">copy</button>
        </div>
        <div>Shortened by {{ short.author }}</div>
        <button v-on:click="deleteShort(short.short)">delete</button>
      </li>
    </ul>
  </section>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { shortsRef } from '../database';

export default {
  name: "Shorts",
  computed: {
    ...mapState({
      shorts: 'shorts',
    }),
    ...mapGetters({
      orderedShorts: 'orderedShorts',
    })
  },
  methods: {
    deleteShort: function (path) {
      shortsRef.child(path).remove();
    },
  },
}
</script>

<style>
  p {
    margin: 0;
  }

  li {
    margin-bottom: 1rem;
  }
</style>
