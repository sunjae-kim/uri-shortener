import { firebaseAction } from 'vuexfire'

export default {
  bindShorts: firebaseAction(async (context, shortsRef) => {
    await context.bindFirebaseRef('shorts.data', shortsRef);
    context.commit('setShortsLoading', false);
  }),
};
