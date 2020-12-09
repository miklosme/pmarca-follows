const twitter = require('./twitter');

exports.handler = async event => {
    // batch size is 1
    const item = event['Records'][0];

    if (item.eventName !== 'INSERT') {
        return;
    }

    const data = await twitter({
        url: 'https://api.twitter.com/1.1/statuses/user_timeline.json',
        qs: {
            user_id: item.dynamodb['Keys']['id']['S'],
            count: 40,
        },
    });

    const SEVEN_DAYS_AGO = Date.now() - 7 * 24 * 60 * 60 * 1000;
    const tweets = data
        .filter(tweet => !tweet.text.startsWith('RT '))
        .filter(tweet => new Date(tweet.created_at).getTime() > SEVEN_DAYS_AGO);
    const topLikeCount = Math.max(...tweets.map(tweet => tweet.favorite_count));
    const topTweet = tweets.find(tweet => tweet.favorite_count === topLikeCount);

    if (!topTweet) {
        console.log('There were no top tweet.');
        return;
    }

    console.log('topTweet: \n' + JSON.stringify(topTweet, null, 2));

    await twitter({
        method: 'POST',
        url: `https://api.twitter.com/1.1/statuses/retweet/${topTweet.id_str}.json`,
    });

    console.log('Retweet was successful.');
};
