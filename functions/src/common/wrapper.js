module.exports = asyncFn => async (req, res, next) => {
  try {
    console.log('DEBUG: Enter wrapper.');
    return await asyncFn(req, res, next);
  } catch (error) {
    console.log(error)
    return res.status(400).send(error);
  }
};