<template>
  <div class="content">
    <div class="ui stackable grid">
      <div class="two column row">
        <!-- Content -->
        <div class="column">
          <h3 class="ui header">
            <span class="item-header">
              {{ short.keyword }}
              <span class="secondary-text">{{ createdAt }}</span>
              <span class="secondary-text">visited: {{ short.view || 0 }}</span>
            </span>
            <div class="sub header text-wrap">
              <a target="_blank" :href="short.originalUri">
                <i class="m-0 linkify icon"></i>
                {{ short.originalUri }}
              </a>
            </div>
          </h3>
        </div>
        <!-- Buttons -->
        <div class="column right aligned">
          <div class="ui icon buttons">
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import useShortStore from '@/stores/short'
import moment from 'moment'
import Swal from 'sweetalert2'
import { PropType } from 'vue'
import { Short } from '../../../types/entity'
const shortStore = useShortStore()

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
    onCopy (keyword: string) {
      const Toast = Swal.mixin({
        toast: true,
        position: 'bottom-end',
        showConfirmButton: false,
        timer: 3000,
        scrollbarPadding: false,
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
          const keywordEl = document.getElementById(
            'updating-keyword',
          ) as HTMLInputElement
          const uriEl = document.getElementById(
            'updating-uri',
          ) as HTMLInputElement
          if (!keywordEl || !uriEl) return
          return [keywordEl.value, uriEl.value]
        },
        scrollbarPadding: false,
      })

      // TODO: 타입 잡기
      const value = result.value as any
      if (value) {
        const [keyword, originalUri] = value
        if (short.keyword === keyword && short.originalUri === originalUri) {
          return Swal.fire({
            title: '수정 완료',
            html: '변경사항이 없습니다',
            icon: 'success',
            scrollbarPadding: false,
          })
        }

        const { isSuccessful, payload } = await shortStore.update({
          short,
          keyword,
          originalUri,
        })
        if (isSuccessful) {
          await Swal.fire({
            title: `tishe.me/${payload.keyword}`,
            html: '성공적으로 수정되었습니다',
            icon: 'success',
            scrollbarPadding: false,
          })
        } else {
          const error = payload.error as any
          await Swal.fire({
            title: '오류',
            html: error.response ? error.response.data.message : error.message,
            icon: 'error',
            scrollbarPadding: false,
          })
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
        scrollbarPadding: false,
      })
      if (result.value) {
        await shortStore.delete({ keyword })
        Swal.fire({
          title: '삭제완료',
          html: '성공적으로 삭제되었습니다',
          icon: 'success',
          scrollbarPadding: false,
        })
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
