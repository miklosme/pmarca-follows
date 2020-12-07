require('dotenv').config();

const https = require('https');

(async () => {
    const id = '1311339932548501500';

    await new Promise((resolve, reject) => {
        const url = `https://api.twitter.com/1.1/statuses/retweet/${id}.json`;
        console.log('await promise', url)
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
                // resolve();
                res.on('end', () => {
                    resolve();
                });
            },
        );

        req.on('error', e => {
            reject(e);
        });
    });
})();
