import Swal from 'sweetalert2';
import axios from 'axios';
import { firebaseAction } from 'vuexfire';
import { shortListRef, TIMESTAMP } from '@/database';

const state = {
  loading: true,
  data: {},
};

const getters = {
  orderedShortList: ({ data }, _, { user }) =>
    Object.values(data)
      .sort((a, b) => b.createdAt - a.createdAt)
      .filter(short => short.uid === user.data.uid),
  metaData: (_, __, { user: { data } }) => ({
    author: data.displayName,
    uid: data.uid,
    createdAt: TIMESTAMP,
  }),
};

const mutations = {
  setShortsLoading(state, loading) {
    state.loading = loading;
  },
};

const actions = {
  bindShortList: firebaseAction(async ({ commit, bindFirebaseRef }) => {
    await bindFirebaseRef('data', shortListRef);
    commit('setShortsLoading', false);
  }),
  async createShort({ commit, getters }, { originalUri, keyword }) {
    try {
      commit('setShortsLoading', true);
      
      if (!originalUri) throw Error('줄이고자 하는 URI 를 입력해주세요');
      if (!keyword) throw Error('등록할 키워드를 입력해주세요');

      const SERVER_IP = process.env.SERVER_IP;
      const response = await axios.post(`${SERVER_IP}/validate-short`, {
        originalUri: encodeURI(originalUri),
        keyword,
      });
      const data = {
        ...response.data,
        ...getters.metaData,
      };

      await shortListRef.child(keyword).set(data);
      commit('setShortsLoading', false);
      await Swal.fire(
        'tishe.me/' + keyword,
        '성공적으로 생성되었습니다',
        'success',
      );
      return true;
    } catch (error) {
      commit('setShortsLoading', false);
      await Swal.fire(
        '오류',
        error.response ? error.response.data.message : error.message,
        'error',
      );
      return false;
    }
  },
  async deleteShort({ commit }, path) {
    const result = await Swal.fire({
      title: '정말 삭제하시겠습니까?',
      text: '삭제한 데이터는 되돌릴 수 없어요',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '네',
      cancelButtonText: '아니요',
    });
    if (result.value) {
      commit('setShortsLoading', true);
      await shortListRef.child(path).remove();
      commit('setShortsLoading', false);
      await Swal.fire('삭제 완료', '성공적으로 삭제되었습니다', 'success');
    }
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true,
};
