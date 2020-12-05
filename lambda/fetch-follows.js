const fetch = require('node-fetch');
const qs = require('qs');

const usersUrl = 'https://api.twitter.com/2/users/by';

exports.handler = async event => {
    const params = {
        usernames: 'pmarca,jack,miklos_me',
        'user.fields': 'created_at,description',
    };
    const url = `${usersUrl}?${qs.stringify(params)}`;
    const res = await fetch(url, {
        method: 'GET',
        headers: {
            authorization: `Bearer ${process.env.TWITTER_TOKEN}`,
        },
    });

    const data = await res.json();

    console.log(data);

    return {
        statusCode: 200,
        headers: { 'Content-Type': 'text/plain' },
        body: `Hello, CDK! You've hit ${event.path}\n`,
    };
};
