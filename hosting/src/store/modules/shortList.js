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
  orderedShortList: ({ data }, getters, { user }) =>
    Object.values(data)
      .sort((a, b) => b.createdAt - a.createdAt)
      .filter(short => short.uid === user.data.uid),
  metaData: (state, getters, { user: { data } }) => ({
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

      if (!originalUri) throw Error('줄이고자 하는 URI를 입력해주세요');
      if (!keyword) throw Error('등록할 키워드를 입력해주세요');

      const snapshot = await shortListRef.child(keyword).once('value');
      if (snapshot.exists()) {
        throw Error('이미 등록된 키워드입니다');
      }

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
      commit('setShortsLoading', { status: false, message: '' });
      return { isSuccessful: true, payload: { keyword } };
    } catch (error) {
      commit('setShortsLoading', { status: false, message: '' });
      return { isSuccessful: false, payload: { error } };
    }
  },
  async deleteShort({ commit }, path) {
    commit('setShortsLoading', {
      status: true,
      message: '데이터를 삭제하는 중입니다..',
    });
    await shortListRef.child(path).remove();
    commit('setShortsLoading', { status: false, message: '' });
  },
  async updateShort({ commit }, [short, [keyword, originalUri]]) {
    try {
      commit('setShortsLoading', {
        status: true,
        message: '데이터를 수정하는 중입니다..',
      });

      if (!originalUri) throw Error('줄이고자 하는 URI 를 입력해주세요');
      if (!keyword) throw Error('등록할 키워드를 입력해주세요');

      const snapshot = await shortListRef.child(keyword).once('value');
      if (keyword !== short.keyword && snapshot.exists()) {
        throw Error('이미 등록된 키워드입니다');
      }

      const SERVER_IP = process.env.SERVER_IP;
      const response = await axios.post(`${SERVER_IP}/validate-short`, {
        originalUri: encodeURI(originalUri),
        keyword,
      });

      const data = {
        ...short,
        ...response.data,
      };

      await shortListRef.child(short.keyword).remove();
      await shortListRef.child(keyword).set(data);
      commit('setShortsLoading', { status: false, message: '' });
      return { isSuccessful: true, payload: { keyword } };
    } catch (error) {
      commit('setShortsLoading', { status: false, message: '' });
      return { isSuccessful: false, payload: { error } };
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
