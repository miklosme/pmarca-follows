require('dotenv').config();
const twitter = require('./twitter');

const PMARCA_ID = 5943622;

(async () => {
    const data = await twitter({
        url: 'https://api.twitter.com/1.1/statuses/user_timeline.json',
        qs: {
            user_id: item.dynamodb['Keys']['id']['S'],
            count: 40,
        },
    });

    console.log(data);
})();
