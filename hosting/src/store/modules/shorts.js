import Swal from 'sweetalert2';
import axios from 'axios';
import { firebaseAction } from 'vuexfire';
import { shortsRef, getShort, TIMESTAMP } from '@/database';

const state = {
  loading: true,
  data: {},
};

const getters = {
  orderedShorts: ({ data }, _, { user }) =>
    Object.values(data)
      .sort((a, b) => b.createdAt - a.createdAt) // 시간 순 정렬
      .filter(short => short.uid === user.data.uid), // 로그인 유저의 short 만 보기
  shortMetaData: (_, __, { user }) => ({
    author: user.data.displayName,
    uid: user.data.uid,
    createdAt: TIMESTAMP,
  }),
};

const mutations = {
  setShortsLoading(state, loading) {
    state.loading = loading;
  },
};

const actions = {
  bindShorts: firebaseAction(async context => {
    await context.bindFirebaseRef('data', shortsRef);
    context.commit('setShortsLoading', false);
  }),
  async createShort(context, { originalUrl, short }) {
    try {
      context.commit('setShortsLoading', true);

      if (!originalUrl) throw Error('줄이고자 하는 URI 를 입력해주세요');
      if (!short) throw Error('등록할 키워드를 입력해주세요');
      if (await getShort(short))
        throw Error('이미 등록된 키워드입니다');

      const SERVER_URL = process.env.FIREBASE_FUNCTIONS_URL;
      const response = await axios.get(
        `${SERVER_URL}/validate-url?originalUrl=${originalUrl}&short=${short}`,
      );
      const data = {
        ...response.data,
        ...context.getters.shortMetaData,
      };

      await shortsRef.child(data.short).set(data);
      context.commit('setShortsLoading', false);
      await Swal.fire(
        'tishe.me/' + data.short,
        '성공적으로 생성되었습니다',
        'success',
      );
      return true;
    } catch (error) {
      context.commit('setShortsLoading', false);
      await Swal.fire(
        '오류',
        error.response ? error.response.data.message : error.message,
        'error',
      );
      return false;
    }
  },
  async deleteShort(context, path) {
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
    context.commit('setShortsLoading', true);
    if (result.value) {
      shortsRef.child(path).remove();
      context.commit('setShortsLoading', false);
      await Swal.fire('삭제 완료', '성공적으로 삭제되었습니다', 'success');
    }
    context.commit('setShortsLoading', false);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
