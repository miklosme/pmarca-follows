const { DynamoDB } = require('aws-sdk');
const twitter = require('./twitter');

const PMARCA_ID = 5943622;

exports.handler = async () => {
    const data = await twitter({
        url: 'https://api.twitter.com/1.1/friends/list.json',
        qs: {
            user_id: PMARCA_ID,
        },
    });

    console.log('friend data:', data);

    const dynamo = new DynamoDB();

    await dynamo
        .batchWriteItem({
            RequestItems: {
                [process.env.FOLLOWS_TABLE_NAME]: data.users.map(user => ({
                    PutRequest: {
                        Item: {
                            id: { S: user.id_str },
                        },
                    },
                })),
            },
        })
        .promise();

    console.log(
        'Last follow ids:',
        data.users.map(u => u.id),
    );
};
