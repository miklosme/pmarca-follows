const twitter = require('./twitter');

exports.handler = async event => {
    const item = event['Records'][0];

    if (item.eventName !== 'INSERT') {
        return;
    }

    console.log("event['Records'][0]", event['Records'][0])

    const data = await twitter({
        url: 'https://api.twitter.com/1.1/statuses/user_timeline.json',
        qs: {
            user_id: item.dynamodb['Keys']['id']['S'],
            count: 40,
        },
    });

    const tweets = data.filter(t => !t.text.startsWith('RT '));
    const topLikeCount = Math.max(...tweets.map(t => t.favorite_count));
    const topTweet = tweets.find(t => t.favorite_count === topLikeCount);

    if (!topTweet) {
        console.log('There were no top tweet.');
        return;
    }

    console.log('topTweet: \n' + JSON.stringify(topTweet, null, 2));

    const res = await twitter({
        method: 'POST',
        url: `https://api.twitter.com/1.1/statuses/retweet/${topTweet.id_str}.json`,
    });

    console.log('Retweet was successful, response:', res);
};
