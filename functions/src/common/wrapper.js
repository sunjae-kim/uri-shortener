module.exports = asyncFn => async (req, res, next) => {
  const domain = process.env.CLIENT_DOMAIN;
  try {
    return await asyncFn(req, res, next);
  } catch (error) {
    console.error(error)
    return res.redirect(`${domain}/invalid`);
  }
};
