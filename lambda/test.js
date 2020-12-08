require('dotenv').config();

const request = require('request-promise');

(async () => {
    const id = '1311339932548501505';

    const res = await request.post({
        url: `https://api.twitter.com/1.1/statuses/retweet/${id}.json`,
        oauth: {
            consumer_key: process.env.TWITTER_CONSUMER_KEY,
            consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
            token: process.env.TWITTER_ACCESS_TOKEN,
            token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
        },
    });

    console.log('success:', res)
})();
