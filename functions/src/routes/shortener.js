const { shortsRef, getShort } = require('../database');
const { validateUrl } = require('../service');

const getList = (req, res) => {
    return shortsRef.once('value', snapshot => {
        return res.status(200).send(snapshot.val());
    }, error => {
        return res.status(500).send({ message: error });
    });
}

const toShort = (req, res) => {
    return getShort(req.params.path, data => {
        if (data) return res.redirect(data.originalUrl);
        return res.status(404).send({ message: `page not exists : ${req.params.path}` })
    })
}

const shorten = (req, res) => {
    try {
        const { value, error } = validateUrl(req.body);
        if (error) return res.status(400).send({ message: error.details[0].message, value: error.details });

        const { short } = req.body;
        return getShort(short, async data => {
            if (data) return res.status(409).send({ message: `page already exists : ${short}` });

            await shortsRef.child(short).set(value);
            return res.status(200).send({ message: `sunjae.kim/${short}`, value });
        });
    } catch (error) {
        return res.status(500).send({ message: error });
    }
}

module.exports = {
    getList, toShort, shorten,
}
