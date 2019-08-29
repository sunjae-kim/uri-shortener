export default {
  orderedShorts: state => Object.values(state.shorts.data).sort((a, b) => b.createdAt - a.createdAt),
};
