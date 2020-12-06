const { DynamoDB } = require('aws-sdk');
const https = require('https');
const qs = require('querystring');

const URL = 'https://api.twitter.com/1.1/friends/list.json';
const PMARCA_ID = 5943622;
const TABLE = process.env.FOLLOWS_TABLE_NAME;

exports.handler = async event => {
    const params = {
        user_id: PMARCA_ID,
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
    const dynamo = new DynamoDB();

    const lastFollows = data.users.map(u => String(u.id));
    const lastFollowsQuery = await dynamo
        .batchGetItem({
            RequestItems: {
                [TABLE]: {
                    Keys: lastFollows.map(id => ({
                        id: { N: id },
                    })),
                },
            },
        })
        .promise();

    const knownIdsSet = new Set(lastFollowsQuery['Responses'][TABLE].map(x => String(x['id']['N'])));
    const newFollowsIdsSet = new Set(lastFollows.filter(id => !knownIdsSet.has(id)));

    const datetime = new Date().getTime().toString();

    const newUsers = data.users
        .filter(user => newFollowsIdsSet.has(String(user.id)))
        .map(user => ({ id: user.id, name: user.name }));

    if (newUsers.length) {
        await dynamo
            .batchWriteItem({
                RequestItems: {
                    [TABLE]: newUsers.map(user => ({
                        PutRequest: {
                            Item: {
                                id: { N: String(user.id) },
                                name: { S: user.name },
                                date: { S: datetime },
                            },
                        },
                    })),
                },
            })
            .promise();
    }

    const result = JSON.stringify(
        {
            newUsers,
        },
        null,
        2,
    );

    return {
        statusCode: 200,
        headers: { 'Content-Type': 'text/plain' },
        body: `Follow fetch successful: ${result}\n`,
    };
};
