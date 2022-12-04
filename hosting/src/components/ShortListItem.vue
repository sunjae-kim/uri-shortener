<template>
  <sui-list-content>
    <sui-grid stackable>
      <sui-grid-row :columns="2">
        <!-- Content -->
        <sui-grid-column>
          <h3 is="sui-header">
            <span class="item-header">
              {{ short.keyword }}
              <span class="secondary-text">{{ createdAt }}</span>
              <span class="secondary-text">visited: {{ short.view || 0 }}</span>
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
        <sui-grid-column text-align="right">
          <sui-button-group icons>
            <!-- Copy Button -->
            <button
              class="big ui basic button copy_btn remote-btn"
              :data-clipboard-text="'https://tisha.me/' + short.keyword"
              @click="onCopy(short.keyword)"
              @mouseenter="btns.copy = true"
              @mouseleave="btns.copy = false"
            >
              <transition name="fade">
                <div
                  v-show="btns.copy"
                  class="ui basic pointing below label btn-label"
                >
                  <p>copy</p>
                </div>
              </transition>
              <i class="clipboard icon" style="color: teal"></i>
            </button>
            <!-- Edit Button -->
            <button
              class="big ui basic button remote-btn"
              @click="onEdit(short)"
              @mouseenter="btns.edit = true"
              @mouseleave="btns.edit = false"
            >
              <transition name="fade">
                <div
                  v-show="btns.edit"
                  class="ui basic pointing below label btn-label"
                >
                  <p>edit</p>
                </div>
              </transition>
              <i class="edit icon" style="color: teal"></i>
            </button>
            <!-- Delete Button -->
            <button
              class="big ui basic button remote-btn"
              @click="onDelete(short.keyword)"
              @mouseenter="btns.remove = true"
              @mouseleave="btns.remove = false"
            >
              <transition name="fade">
                <div
                  v-show="btns.remove"
                  class="ui basic pointing below label btn-label"
                >
                  <p>remove</p>
                </div>
              </transition>
              <i class="trash icon" style="color: firebrick"></i>
            </button>
          </sui-button-group>
        </sui-grid-column>
      </sui-grid-row>
    </sui-grid>
  </sui-list-content>
</template>

<script lang="ts">
import moment from 'moment'
import Swal from 'sweetalert2'
import { PropType } from 'vue'
import { mapActions } from 'vuex'
import { Short } from '../../../types/entity'

export default {
  name: 'ShortListItem',
  data: () => ({
    btns: {
      copy: false,
      edit: false,
      remove: false,
    },
  }),
  props: {
    short: { type: Object as PropType<Short>, required: true },
  },
  methods: {
    ...mapActions('shortList', ['deleteShort', 'updateShort']),
    onCopy (keyword: string) {
      const Toast = Swal.mixin({
        toast: true,
        position: 'bottom-end',
        showConfirmButton: false,
        timer: 3000,
      })

      Toast.fire({
        icon: 'success',
        html: `<div style="padding: 1em;">
            <h4 style="margin-bottom: 0.4em;">tishe.me/${keyword}</h4>
            <p>클립보드에 복사되었습니다</p>
          </div>`,
      })
    },
    async onEdit (short: Short) {
      const keywordEl = document.getElementById(
        'updating-keyword',
      ) as HTMLInputElement
      const uriEl = document.getElementById('updating-uri') as HTMLInputElement
      if (!keywordEl || !uriEl) return
      const result = await Swal.fire({
        title: '수정하기',
        html: `<div style="width: 100%; margin-top: 1em" class="ui labeled input">
            <div class="ui label">tisha.me/</div>
            <input id="updating-keyword" value="${short.keyword}"/>
          </div>
          <div style="width: 100%; margin-top: 1em"  class="ui input">
            <input id="updating-uri" value="${short.originalUri}"/>
          </div>`,
        focusConfirm: false,
        confirmButtonText: '확인',
        preConfirm: () => {
          return [keywordEl.value, uriEl.value]
        },
      })

      // TODO: 타입 잡기
      const value = result.value as any
      if (value) {
        if (
          short.keyword === value.keyword &&
          short.originalUri === value.originalUri
        ) {
          return Swal.fire('수정 완료', '변경사항이 없습니다', 'success')
        }

        const { isSuccessful, payload } = await this.updateShort([short, value])
        if (isSuccessful) {
          await Swal.fire(
            'tishe.me/' + payload.keyword,
            '성공적으로 수정되었습니다',
            'success',
          )
        } else {
          const { error } = payload
          await Swal.fire(
            '오류',
            error.response ? error.response.data.message : error.message,
            'error',
          )
        }
      }
    },
    async onDelete (keyword: string) {
      const result = await Swal.fire({
        title: '정말 삭제하시겠습니까?',
        text: '삭제한 데이터는 되돌릴 수 없어요',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        confirmButtonText: '삭제하기',
        cancelButtonText: '취소하기',
      })
      if (result.value) {
        await this.deleteShort(keyword)
        Swal.fire('삭제 완료', '성공적으로 삭제되었습니다', 'success')
      }
    },
  },
  filters: {
    formatDate: (timestamp: number) => moment(timestamp).fromNow(),
  },
  computed: {
    createdAt () {
      return moment(this.short.createdAt).fromNow()
    },
  },
}
</script>

<style>
.secondary-text {
  color: darkgray;
  font-size: 0.8rem;
  font-weight: 100;
  margin-left: 0.3rem;
}

.item-header {
  display: inline-block;
  margin-bottom: 0.3em;
}

.remote-btn {
  position: relative;
  display: flex !important;
  justify-content: center;
}

.btn-label {
  position: absolute !important;
  top: -30px;
}

/* Semantic UI Overriding */
.ui.list .list > .item > .content,
.ui.list > .item > .content {
  padding: 1rem 0;
}

/* SweetAlert2 Overring */
.swal2-popup.swal2-toast {
  padding: 0 2em;
}
</style>
