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
        if (data) return res.redirect(301, data.originalUrl);
        return res.status(404).send({ message: `page not exists : ${req.params.path}` });
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
            return res.status(200).send({ message: `${short}`, value });
        });
    } catch (error) {
        return res.status(500).send({ message: error });
    }
}

const deleteShort = (req, res) => {
    const { path } = req.params;
    return getShort(path, async data => {
        if (!data) return res.status(404).send({ message: `page already not exists : ${path}` });
        await shortsRef.child(path).remove()
        return res.status(200).send({ message: `page deleted: ${path}`});
    })
}

module.exports = {
    getList, toShort, shorten, deleteShort,
}
