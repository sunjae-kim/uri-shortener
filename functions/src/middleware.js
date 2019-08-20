const checkToken = (req, res, next) => {
    const HUBOT_SLACK_TOKEN = req.header('Hubot-Slack-Token');
    if (HUBOT_SLACK_TOKEN !== process.env.HUBOT_SLACK_TOKEN) {
        return res.status(403).send({ message: 'access denied' })
    }
    return next();
}

module.exports = {
    checkToken,
}
