<template>
  <div id="app">
    <form v-on:submit.prevent="createShort">
      <input v-model="url.originalUrl" type="text" placeholder="https://original-url.com"> → 
      <span>tisha.me/</span><input v-model="url.short" type="text" placeholder="short">
      <button v-on="createShort">Shorten!</button>
    </form>
    <hr>
    <ul>
      <li v-for="short in shortList" :key="short.originalUrl">
        <div>
          <p><span>{{ short.originalUrl }}</span></p>
          &rarr; <span>https://tisha.me/{{ short.short }}</span>
          <button v-on:click="copyToClipBoard(short.short)">copy</button>
        </div>
        <div>Shortened by {{ short.author }}</div>
        <button v-on:click="deleteShort(short.short)">delete</button>
      </li>
    </ul>
  </div>
</template>

<script>
import firebase, { db } from './database';
const shortsRef = db.ref('/shorts');

export default {
  name: "App",
  data() {
    return {
      url: {
        originalUrl: "",
        short: "",
        createdAt: null,
      },
      shortList: {}
    };
  },
  created () { this.getList(); },
  methods: {
    createShort: async function () {
      await shortsRef.child(this.url.short).set({
        originalUrl: this.url.originalUrl,
        short: this.url.short,
        createdAt: firebase.database.ServerValue.TIMESTAMP,
        author: '김선재',
      });
      this.url = {
        originalUrl: "",
        short: "",
      };
      this.getList();
    },
    deleteShort: async function (path) {
      await shortsRef.child(path).remove();
      this.getList();
    },
    getList: async function () {
      shortsRef.orderByChild('createdAt').once('value', snapshot => {
        this.shortList = Object.values(snapshot.val()).sort((a, b) => b.createdAt - a.createdAt);
      });
    },
    copyToClipBoard: async function (value) {
      const tmp = document.createElement("textarea");
      document.body.appendChild(tmp);
      tmp.value = `https://tisha.me/${value}`;
      tmp.select();
      document.execCommand('copy');
      document.body.removeChild(tmp);
    }
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
