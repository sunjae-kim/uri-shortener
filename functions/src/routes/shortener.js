const { http, https } = require('follow-redirects');
const { shortListRef } = require('../database');
const { validateShortData, getToday } = require('../utils');
const wrapper = require('../common/wrapper');

const redirect = wrapper(async (req, res) => {
  const { value, error } = validateShortData(req.params);
  const domain = process.env.CLIENT_DOMAIN;

  if (error)
    return res.redirect(`${domain}/invalid?keyword=${req.params.keyword}`);

  const { keyword } = value;
  const snapshot = await shortListRef.child(keyword).once('value');
  const data = snapshot.val();

  if (data) {
    const ipAddress =
      req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const today = getToday();
    let visited = data.visited || [today];
    if (visited[0] !== today) visited = [today];
    if (!visited.includes(ipAddress)) {
      visited.push(ipAddress);
      const view = (data.view || 0) + 1;
      Object.assign(data, { visited, view });
      shortListRef.child(keyword).set(data);
    }
    return res.redirect(301, data.originalUri);
  }

  return res.redirect(`${domain}/invalid?keyword=${keyword}`);
});

const validateShort = wrapper(async (req, res) => {
  const { value, error } = validateShortData(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  const { keyword, originalUri } = value;
  const httpsRegex = /^https:\/\//;
  const isHttps = httpsRegex.test(originalUri);
  const get = isHttps ? https.get : http.get;

  return get(originalUri, response => {
    const { hostname } = new URL(response.responseUrl);
    const domain = process.env.CLIENT_DOMAIN;
    if (domain.includes(hostname))
      return res.status(400).send({ message: '등록할 수 없는 URI입니다' });
    return res.status(200).send({ originalUri, keyword });
  }).on('error', () =>
    res.status(400).send({ message: '유효하지 않은 URI입니다' }),
  );
});

module.exports = {
  redirect,
  validateShort,
};
