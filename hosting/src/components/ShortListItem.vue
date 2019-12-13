<template>
  <sui-list-content>
    <sui-grid stackable>
      <sui-grid-row :columns="2">
        <!-- Content -->
        <sui-grid-column>
          <h3 is="sui-header">
            <span>
              {{ short.keyword }}
              <span class="created-at">{{ short.createdAt | formatDate }}</span>
            </span>
            <sui-header-subheader class="text-wrap">
              <a target="_blank" :href="short.originalUri">
                <sui-icon class="m-0" name="linkify" />
                {{ short.originalUri }}
              </a>
            </sui-header-subheader>
          </h3>
        </sui-grid-column>
        <!-- Buttons -->
        <sui-grid-column>
          <sui-button floated="right" color="red" icon="trash" @click="deleteShort(short.keyword)"></sui-button>
          <sui-button
            floated="right"
            color="teal"
            icon="clipboard"
            class="copy_btn"
            :data-clipboard-text="'https://tisha.me/' + short.keyword"
            @click="onCopyBtnClick(short.keyword)"
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

export default {
  name: 'ShortListItem',
  props: {
    short: Object,
  },
  methods: {
    ...mapActions('shortList', ['deleteShort']),
    onCopyBtnClick(keyword) {
      Swal.fire({
        icon: 'success',
        title: 'tishe.me/' + keyword,
        text: '클립보드에 복사되었습니다',
        showConfirmButton: false,
        timer: 1250,
      });
    },
  },
  filters: {
    formatDate: timestamp => moment(timestamp).fromNow(),
  },
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