const { http, https } = require('follow-redirects');
const { shortListRef } = require('../database');
const { validateShortData } = require('../utils/validators');
const wrapper = require('../common/wrapper');

const redirect = wrapper(async (req, res) => {
  const domain = process.env.CLIENT_DOMAIN;
  const { keyword } = req.params;
  const snapshot = await shortListRef.child(keyword).once('value');
  const data = snapshot.val();
  if (data) return res.redirect(301, data.originalUri);
  return res.redirect(`${domain}/invalid?keyword=${keyword}`);
});

const validateShort = wrapper(async (req, res) => {
  const { value, error } = validateShortData(req.query);
  if (error) return res.status(400).send({ message: error.details[0].message });

  const { keyword, originalUri } = value;
  const snapshot = await shortListRef.child(keyword).once('value');
  if (snapshot.exists())
    return res.status(400).send({ message: '이미 등록된 키워드입니다' });

  const httpsRegex = /^https:\/\//;
  const isHttps = httpsRegex.test(originalUri);
  const get = isHttps ? https.get : http.get;
  return get(originalUri, response =>
    res.status(200).send({
      originalUri: response.responseUrl,
      keyword,
    }),
  );
});

module.exports = {
  redirect,
  validateShort,
};
