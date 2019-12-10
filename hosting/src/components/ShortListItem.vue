<template>
  <sui-list-content>
    <sui-grid stackable>
      <sui-grid-row :columns="2">
        <sui-grid-column>
          <h3 is="sui-header">
            <span>
              {{ short.short }}
              <span class="created-at">{{ formatDate(short.createdAt) }}</span>
            </span>
            <sui-header-subheader class="text_wrap">
              <a target="_blank" :href="short.originalUrl">
                <sui-icon class="m0" name="linkify" />
                {{ short.originalUrl }}
              </a>
            </sui-header-subheader>
          </h3>
        </sui-grid-column>
        <sui-grid-column>
          <sui-button floated="right" color="red" icon="trash" @click="deleteShort(short.short)"></sui-button>
          <sui-button
            floated="right"
            color="teal"
            icon="clipboard"
            class="copy_btn"
            :data-clipboard-text="'https://tisha.me/' + short.short"
            @click="onCopyBtnClick(short.short)"
          ></sui-button>
        </sui-grid-column>
      </sui-grid-row>
    </sui-grid>
  </sui-list-content>
</template>

<script>
import moment from 'moment';
import Swal from 'sweetalert2';
import { mapActions } from 'vuex';
import { shortsRef, getShort } from '@/database';

export default {
  name: 'ShortListItem',
  props: {
    short: Object
  },
  methods: {
    ...mapActions(['deleteShort']),
    onCopyBtnClick(short) {
      Swal.fire({
        icon: 'success',
        title: 'tishe.me/' + short,
        text: '클립보드에 복사되었습니다',
        showConfirmButton: false,
        timer: 1250
      });
    },
    formatDate(timestamp) {
      return moment(timestamp).fromNow();
    }
  }
};
</script>

<style>
.created-at {
  color: darkgray;
  font-size: 0.8rem;
  font-weight: 100;
  margin-left: 0.3rem;
}

/* Semantic UI Overriding */
.ui.list .list > .item > .content,
.ui.list > .item > .content {
  padding: 1rem 0;
}
</style>