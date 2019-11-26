export default {
  orderedShorts: state => {
    return Object.values(state.shorts.data)
      .sort((a, b) => b.createdAt - a.createdAt)
      .filter(short => short.uid === state.user.data.uid)
  },
};
