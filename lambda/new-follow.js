const https = require('https');
const qs = require('querystring');
const request = require('request-promise');

const URL = 'https://api.twitter.com/1.1/statuses/user_timeline.json';

exports.handler = async (event, context) => {
    const item = event['Records'][0];

    if (item.eventName !== 'INSERT') {
        return;
    }

    const params = {
        user_id: item.dynamodb['Keys']['id']['N'],
        count: 40,
    };

    const data = await new Promise((resolve, reject) => {
        let dataString = '';
        const req = https.get(
            `${URL}?${qs.stringify(params)}`,
            {
                headers: {
                    authorization: `Bearer ${process.env.TWITTER_TOKEN}`,
                },
            },
            res => {
                res.on('data', chunk => {
                    dataString += chunk;
                });
                res.on('end', () => {
                    resolve(JSON.parse(dataString));
                });
            },
        );

        req.on('error', e => {
            reject(e);
        });
    });

    const tweets = data.filter(t => !t.text.startsWith('RT '));
    const topLikeCount = Math.max(...tweets.map(t => t.favorite_count));
    const topTweet = tweets.find(t => t.favorite_count === topLikeCount);

    if (!topTweet) {
        console.log('There were no top tweet.');
        return;
    }

    console.log('topTweet: \n' + JSON.stringify(topTweet, null, 2));

    const res = await request.post({
        url: `https://api.twitter.com/1.1/statuses/retweet/${topTweet.id_str}.json`,
        oauth: {
            consumer_key: process.env.TWITTER_CONSUMER_KEY,
            consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
            token: process.env.TWITTER_ACCESS_TOKEN,
            token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
        },
    });

    console.log('Retweet was successful, response:', res);

    // console.log('EVENT: \n' + JSON.stringify(event, null, 2));
    return context.logStreamName;
};
