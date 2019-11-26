const { getShort } = require('../database');
const { validateShort } = require('../service');

const toShort = (req, res) => {
    const { path } = req.params;
    const { value, error } = validateShort(path);
    if (error) return res.status(404).send({ message: error.details[0].message });

    return getShort(value, data => {
        if (data) return res.redirect(301, data.originalUrl);
        return res.status(404).send({ message: `page not exists : ${path}` });
    })
}

module.exports = {
  toShort
};
