<template>
  <div id="app">
    <form v-on:submit.prevent="createShort">
      <input v-model="url.originalUrl" type="text" placeholder="https://original-url.com"> → 
      <span>tisha.me/</span><input v-model="url.short" type="text" placeholder="short">
      <button v-on:click="createShort">Shorten!</button>
    </form>
    <hr>
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
  </div>
</template>

<script>
import firebase, { shortsRef, TIMESTAMP } from './database';
import { mapState, mapGetters } from 'vuex';
import ClipboardJS from 'clipboard'; new ClipboardJS('.btn');

export default {
  data () {
    return {
      url: {
        originalUrl: '',
        short: '',
        author: 'Annonymous',
        createdAt: TIMESTAMP,
      }
    }
  },
  name: "App",
  computed: {
    ...mapState({
      shorts: 'shorts',
    }),
    ...mapGetters({
      orderedShorts: 'orderedShorts',
    })
  },
  created () {
    this.$store.dispatch('bindShorts', shortsRef);
  },
  methods: {
    createShort: async function () {
      await shortsRef.child(this.url.short).set(this.url);
      this.url = {
        originalUrl: '',
        short: '',
        author: 'Annonymous',
        createdAt: TIMESTAMP,
      };
    },
    deleteShort: function (path) {
      shortsRef.child(path).remove();
    },
  }
};
</script>

<style>
  p {
    margin: 0;
  }

  li {
    margin-bottom: 1rem;
  }
</style>
