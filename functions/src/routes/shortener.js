const { http, https } = require('follow-redirects');
const { shortsRef } = require('../database');
const { validateData } = require('../service');
const wrapper = require('../common/wrapper');

const redirect = (req, res) => {
  const domain = process.env.DOMAIN;
  const { path } = req.params;
  shortsRef.child(path).once(
    'value',
    snapshot => {
      const data = snapshot.val();
      if (data) return res.redirect(301, data.originalUrl);
      return res.redirect(`${domain}/invalid?short=${path}`);
    },
    () => res.redirect(`${domain}/invalid`),
  );
};

const validateUri = wrapper(async (req, res) => {
  const { value, error } = validateData(req.query);
  if (error) return res.status(400).send({ message: error.details[0].message });
  const { short, originalUrl } = value;

  const snapshot = await shortsRef.child(short).once('value');
  if (snapshot.exists())
    return res.status(400).send({ message: '이미 등록된 키워드입니다' });

  const httpsRegex = /^https:\/\//;
  const isHttps = httpsRegex.test(originalUrl);
  const get = isHttps ? https.get : http.get;
  return get(originalUrl, response => {
    res.status(200).send({
      originalUrl: response.responseUrl,
      short,
    });
  });
});

module.exports = {
  redirect,
  validateUri,
};
