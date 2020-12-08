import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import * as apigw from '@aws-cdk/aws-apigateway';
import * as assets from '@aws-cdk/aws-s3-assets';
import * as path from 'path';

require('dotenv').config();

export class PmarcaFollowsStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const lambdaAsset = new assets.Asset(this, 'lambda.zip', {
            path: path.join(__dirname, '..', 'lambda'),
        });

        const followsTable = new dynamodb.Table(this, 'Follows', {
            partitionKey: { name: 'id', type: dynamodb.AttributeType.NUMBER },
            stream: dynamodb.StreamViewType.NEW_IMAGE,
        });

        const fetchFollows = new lambda.Function(this, 'FetchFollows', {
            runtime: lambda.Runtime.NODEJS_12_X,
            code: lambda.Code.fromBucket(lambdaAsset.bucket, lambdaAsset.s3ObjectKey),
            handler: 'fetch-follows.handler',
            timeout: cdk.Duration.seconds(10),
            environment: {
                TWITTER_TOKEN: process.env.TWITTER_TOKEN as string,
                FOLLOWS_TABLE_NAME: followsTable.tableName,
            },
        });

        followsTable.grantReadWriteData(fetchFollows);

        new apigw.LambdaRestApi(this, 'Endpoint', {
            handler: fetchFollows,
        });

        const newFollow = new lambda.Function(this, 'NewFollow', {
            runtime: lambda.Runtime.NODEJS_12_X,
            code: lambda.Code.fromAsset('lambda'),
            handler: 'new-follow.handler',
            timeout: cdk.Duration.seconds(10),
            environment: {
                TWITTER_TOKEN: process.env.TWITTER_TOKEN as string,
                TWITTER_CONSUMER_KEY: process.env.TWITTER_CONSUMER_KEY as string,
                TWITTER_CONSUMER_SECRET: process.env.TWITTER_CONSUMER_SECRET as string,
                TWITTER_ACCESS_TOKEN: process.env.TWITTER_ACCESS_TOKEN as string,
                TWITTER_ACCESS_TOKEN_SECRET: process.env.TWITTER_ACCESS_TOKEN_SECRET as string,
            },
        });

        followsTable.grantStreamRead(newFollow);

        newFollow.addEventSourceMapping('EventSourceMapping', {
            eventSourceArn: followsTable.tableStreamArn as string,
            enabled: true,
            startingPosition: lambda.StartingPosition.LATEST,
            batchSize: 1,
        });
    }
}
