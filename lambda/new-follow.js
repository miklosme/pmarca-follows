const https = require('https');
const qs = require('querystring');

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

    await new Promise((resolve, reject) => {
        const url = `https://api.twitter.com/1.1/statuses/retweet/${topTweet.id}.json`;
        const req = https.request(
            url,
            {
                method: 'POST',
                headers: {
                    authorization: `Bearer ${process.env.TWITTER_TOKEN}`,
                },
            },
            res => {
                console.log('Retweet resolved with code:', res.statusCode);
                resolve();
            },
        );

        req.on('error', e => {
            reject(e);
        });
    });

    console.log('Retweet was successful.');

    // console.log('EVENT: \n' + JSON.stringify(event, null, 2));
    return context.logStreamName;
};
