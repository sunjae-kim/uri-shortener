<template>
  <sui-list-content>
    <sui-grid stackable>
      <sui-grid-row :columns="2">
        <sui-grid-column>
          <h3 is="sui-header">
            <span class="ui text gray">
              <sui-label class="m0">tisha.me/</sui-label>
              {{ short.short }}
            </span>
            <sui-header-subheader class="text_wrap">
              <a target="_blank" :href="short.originalUrl">
                <sui-icon name="linkify" />
                {{ short.originalUrl }}
              </a>
            </sui-header-subheader>
          </h3>
        </sui-grid-column>
        <sui-grid-column>
          <sui-button floated="right" color="red" icon="trash" @click="deleteShort(short.short)"></sui-button>
          <sui-button floated="right" icon="edit" @click="onEditBtnClick"></sui-button>
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
import Swal from 'sweetalert2';
import { shortsRef } from '@/database';

export default {
  name: 'ShortListItem',
  props: {
    short: Object
  },
  methods: {
    async deleteShort(path) {
      const result = await Swal.fire({
        title: '정말 삭제하시겠습니까?',
        text: '삭제한 데이터는 되돌릴 수 없어요',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '네',
        cancelButtonText: '아니요'
      });
      if (result.value) {
        shortsRef.child(path).remove();
        Swal.fire('삭제 완료', '성공적으로 삭제되었습니다', 'success');
      }
    },
    onCopyBtnClick(short) {
      Swal.fire({
        icon: 'success',
        title: 'tishe.me/' + short,
        text: '클립보드에 복사되었습니다',
        showConfirmButton: false,
        timer: 1250
      });
    },
    onEditBtnClick() {
      Swal.fire('개발중...', '아직 구현되지 않은 기능입니다.', 'info');
    }
  }
};
</script>

<style>
/* Semantic UI Overriding */
.ui.list .list > .item > .content,
.ui.list > .item > .content {
  padding: 1rem 0;
}
</style>