const request = require('request-promise');

module.exports = options =>
    request({
        ...options,
        oauth: {
            consumer_key: process.env.TWITTER_CONSUMER_KEY,
            consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
            token: process.env.TWITTER_ACCESS_TOKEN,
            token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
        },
        json: true,
    });
