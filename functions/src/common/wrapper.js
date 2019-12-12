module.exports = asyncFn => async (req, res, next) => {
  try {
    return await asyncFn(req, res, next);
  } catch (error) {
    console.log(error)
    return res.status(500).send(error);
  }
};