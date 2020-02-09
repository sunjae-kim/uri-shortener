import Swal from 'sweetalert2';
import axios from 'axios';
import { firebaseAction } from 'vuexfire';
import { shortListRef, TIMESTAMP } from '@/database';

const state = {
  loading: {
    status: true,
    message: '데이터를 가져오는 중입니다..',
  },
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
  setShortsLoading(state, payload) {
    state.loading = payload;
  },
};

const actions = {
  bindShortList: firebaseAction(async ({ commit, bindFirebaseRef }) => {
    await bindFirebaseRef('data', shortListRef);
    commit('setShortsLoading', { status: false, message: '' });
  }),
  async createShort({ commit, getters }, { originalUri, keyword }) {
    try {
      commit('setShortsLoading', {
        status: true,
        message: '데이터를 생성하는 중입니다..',
      });

      if (!originalUri) throw Error('줄이고자 하는 URI 를 입력해주세요');
      if (!keyword) throw Error('등록할 키워드를 입력해주세요');

      const SERVER_IP = process.env.SERVER_IP;
      const response = await axios.post(`${SERVER_IP}/validate-short`, {
        originalUri: encodeURI(originalUri),
        keyword,
      });

      const snapshot = await shortListRef.child(keyword).once('value');
      if (snapshot.exists()) {
        throw Error('이미 등록된 키워드입니다');
      }

      const data = {
        ...response.data,
        ...getters.metaData,
      };

      await shortListRef.child(keyword).set(data);
      commit('setShortsLoading', { status: false, message: '' });
      await Swal.fire(
        'tishe.me/' + keyword,
        '성공적으로 생성되었습니다',
        'success',
      );
      return true;
    } catch (error) {
      commit('setShortsLoading', { status: false, message: '' });
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
      commit('setShortsLoading', {
        status: true,
        message: '데이터를 삭제하는 중입니다..',
      });
      await shortListRef.child(path).remove();
      commit('setShortsLoading', { status: false, message: '' });
      await Swal.fire('삭제 완료', '성공적으로 삭제되었습니다', 'success');
    }
  },
  async updateShort({ commit }, [short, [keyword, originalUri]]) {
    if (short.keyword === keyword && short.originalUri === originalUri) {
      return Swal.fire('수정 완료', '변경사항이 없습니다', 'success');
    }

    try {
      commit('setShortsLoading', {
        status: true,
        message: '데이터를 수정하는 중입니다..',
      });

      if (!originalUri) throw Error('줄이고자 하는 URI 를 입력해주세요');
      if (!keyword) throw Error('등록할 키워드를 입력해주세요');

      const SERVER_IP = process.env.SERVER_IP;
      const response = await axios.post(`${SERVER_IP}/validate-short`, {
        originalUri: encodeURI(originalUri),
        keyword,
      });

      const snapshot = await shortListRef.child(keyword).once('value');
      if (keyword !== short.keyword && snapshot.exists()) {
        throw Error('이미 등록된 키워드입니다');
      }

      const data = {
        ...short,
        ...response.data,
      };

      await shortListRef.child(short.keyword).remove();
      await shortListRef.child(keyword).set(data);
      commit('setShortsLoading', { status: false, message: '' });

      await Swal.fire(
        'tishe.me/' + keyword,
        '성공적으로 수정되었습니다',
        'success',
      );
    } catch (error) {
      commit('setShortsLoading', { status: false, message: '' });
      await Swal.fire(
        '오류',
        error.response ? error.response.data.message : error.message,
        'error',
      );
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
