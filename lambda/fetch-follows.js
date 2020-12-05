const fetch = require('node-fetch');
const qs = require('qs');

const URL = 'https://api.twitter.com/1.1/friends/list.json';
const PMARCA_ID = 5943622;

exports.handler = async event => {
    const params = {
        user_id: PMARCA_ID,
    };
    const res = await fetch(`${URL}?${qs.stringify(params)}`, {
        method: 'GET',
        headers: {
            authorization: `Bearer ${process.env.TWITTER_TOKEN}`,
        },
    });

    const data = await res.json();

    console.log(data.users.map(u => u.name));

    return {
        statusCode: 200,
        headers: { 'Content-Type': 'text/plain' },
        body: `Hello, CDK! You've hit ${event.path}\n`,
    };
};
