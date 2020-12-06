const { DynamoDB } = require('aws-sdk');
const https = require('https');
const qs = require('querystring');

const URL = 'https://api.twitter.com/1.1/friends/list.json';
const PMARCA_ID = 5943622;

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

    console.log(
        data.users.map(u => ({
            id: u.id,
            name: u.name,
        })),
    );

    const dynamo = new DynamoDB();

    await dynamo
        .batchWriteItem({
            RequestItems: {
                [process.env.FOLLOWS_TABLE_NAME]: data.users.map(user => ({
                    PutRequest: {
                        Item: {
                            id: { N: String(user.id) },
                            name: { S: user.name },
                        },
                    },
                })),
            },
        })
        .promise();

    // await dynamo.updateItem({
    //   TableName: process.env.HITS_TABLE_NAME,
    //   Key: { path: { S: event.path } },
    //   UpdateExpression: 'ADD hits :incr',
    //   ExpressionAttributeValues: { ':incr': { N: '1' } }
    // }).promise();

    return {
        statusCode: 200,
        headers: { 'Content-Type': 'text/plain' },
        body: `Hello, CDK! You've hit ${event.path}\n`,
    };
};
