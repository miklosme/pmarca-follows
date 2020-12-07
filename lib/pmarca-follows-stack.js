"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PmarcaFollowsStack = void 0;
const cdk = require("@aws-cdk/core");
const lambda = require("@aws-cdk/aws-lambda");
const dynamodb = require("@aws-cdk/aws-dynamodb");
const apigw = require("@aws-cdk/aws-apigateway");
const cdk_dynamo_table_viewer_1 = require("cdk-dynamo-table-viewer");
require('dotenv').config();
class PmarcaFollowsStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const followsTable = new dynamodb.Table(this, 'Follows', {
            partitionKey: { name: 'id', type: dynamodb.AttributeType.NUMBER },
            stream: dynamodb.StreamViewType.NEW_AND_OLD_IMAGES,
        });
        const fetchFollows = new lambda.Function(this, 'FetchFollows', {
            runtime: lambda.Runtime.NODEJS_12_X,
            code: lambda.Code.fromAsset('lambda'),
            handler: 'fetch-follows.handler',
            environment: {
                TWITTER_TOKEN: process.env.TWITTER_TOKEN,
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
        });
        followsTable.grantStreamRead(newFollow);
        newFollow.addEventSourceMapping('EventSourceMapping', {
            eventSourceArn: followsTable.tableStreamArn,
            enabled: true,
            startingPosition: lambda.StartingPosition.LATEST,
            batchSize: 1,
        });
        new cdk_dynamo_table_viewer_1.TableViewer(this, 'ViewFollowers', {
            title: 'Pmarca Follows',
            table: followsTable,
        });
    }
}
exports.PmarcaFollowsStack = PmarcaFollowsStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG1hcmNhLWZvbGxvd3Mtc3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwbWFyY2EtZm9sbG93cy1zdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxQ0FBcUM7QUFDckMsOENBQThDO0FBQzlDLGtEQUFrRDtBQUNsRCxpREFBaUQ7QUFDakQscUVBQXNEO0FBRXRELE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUUzQixNQUFhLGtCQUFtQixTQUFRLEdBQUcsQ0FBQyxLQUFLO0lBQzdDLFlBQVksS0FBb0IsRUFBRSxFQUFVLEVBQUUsS0FBc0I7UUFDaEUsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFeEIsTUFBTSxZQUFZLEdBQUcsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUU7WUFDckQsWUFBWSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUU7WUFDakUsTUFBTSxFQUFFLFFBQVEsQ0FBQyxjQUFjLENBQUMsa0JBQWtCO1NBQ3JELENBQUMsQ0FBQztRQUVILE1BQU0sWUFBWSxHQUFHLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsY0FBYyxFQUFFO1lBQzNELE9BQU8sRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVc7WUFDbkMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQztZQUNyQyxPQUFPLEVBQUUsdUJBQXVCO1lBQ2hDLFdBQVcsRUFBRTtnQkFDVCxhQUFhLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUF1QjtnQkFDbEQsa0JBQWtCLEVBQUUsWUFBWSxDQUFDLFNBQVM7YUFDN0M7U0FDSixDQUFDLENBQUM7UUFFSCxZQUFZLENBQUMsa0JBQWtCLENBQUMsWUFBWSxDQUFDLENBQUM7UUFFOUMsSUFBSSxLQUFLLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxVQUFVLEVBQUU7WUFDdEMsT0FBTyxFQUFFLFlBQVk7U0FDeEIsQ0FBQyxDQUFDO1FBRUgsTUFBTSxTQUFTLEdBQUcsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxXQUFXLEVBQUU7WUFDckQsT0FBTyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVztZQUNuQyxJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDO1lBQ3JDLE9BQU8sRUFBRSxvQkFBb0I7U0FDaEMsQ0FBQyxDQUFDO1FBRUgsWUFBWSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUV4QyxTQUFTLENBQUMscUJBQXFCLENBQUMsb0JBQW9CLEVBQUU7WUFDbEQsY0FBYyxFQUFFLFlBQVksQ0FBQyxjQUF3QjtZQUNyRCxPQUFPLEVBQUUsSUFBSTtZQUNiLGdCQUFnQixFQUFFLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNO1lBQ2hELFNBQVMsRUFBRSxDQUFDO1NBQ2YsQ0FBQyxDQUFDO1FBRUgsSUFBSSxxQ0FBVyxDQUFDLElBQUksRUFBRSxlQUFlLEVBQUU7WUFDbkMsS0FBSyxFQUFFLGdCQUFnQjtZQUN2QixLQUFLLEVBQUUsWUFBWTtTQUN0QixDQUFDLENBQUM7SUFDUCxDQUFDO0NBQ0o7QUE3Q0QsZ0RBNkNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgY2RrIGZyb20gJ0Bhd3MtY2RrL2NvcmUnO1xuaW1wb3J0ICogYXMgbGFtYmRhIGZyb20gJ0Bhd3MtY2RrL2F3cy1sYW1iZGEnO1xuaW1wb3J0ICogYXMgZHluYW1vZGIgZnJvbSAnQGF3cy1jZGsvYXdzLWR5bmFtb2RiJztcbmltcG9ydCAqIGFzIGFwaWd3IGZyb20gJ0Bhd3MtY2RrL2F3cy1hcGlnYXRld2F5JztcbmltcG9ydCB7IFRhYmxlVmlld2VyIH0gZnJvbSAnY2RrLWR5bmFtby10YWJsZS12aWV3ZXInO1xuXG5yZXF1aXJlKCdkb3RlbnYnKS5jb25maWcoKTtcblxuZXhwb3J0IGNsYXNzIFBtYXJjYUZvbGxvd3NTdGFjayBleHRlbmRzIGNkay5TdGFjayB7XG4gICAgY29uc3RydWN0b3Ioc2NvcGU6IGNkay5Db25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzPzogY2RrLlN0YWNrUHJvcHMpIHtcbiAgICAgICAgc3VwZXIoc2NvcGUsIGlkLCBwcm9wcyk7XG5cbiAgICAgICAgY29uc3QgZm9sbG93c1RhYmxlID0gbmV3IGR5bmFtb2RiLlRhYmxlKHRoaXMsICdGb2xsb3dzJywge1xuICAgICAgICAgICAgcGFydGl0aW9uS2V5OiB7IG5hbWU6ICdpZCcsIHR5cGU6IGR5bmFtb2RiLkF0dHJpYnV0ZVR5cGUuTlVNQkVSIH0sXG4gICAgICAgICAgICBzdHJlYW06IGR5bmFtb2RiLlN0cmVhbVZpZXdUeXBlLk5FV19BTkRfT0xEX0lNQUdFUyxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgZmV0Y2hGb2xsb3dzID0gbmV3IGxhbWJkYS5GdW5jdGlvbih0aGlzLCAnRmV0Y2hGb2xsb3dzJywge1xuICAgICAgICAgICAgcnVudGltZTogbGFtYmRhLlJ1bnRpbWUuTk9ERUpTXzEyX1gsXG4gICAgICAgICAgICBjb2RlOiBsYW1iZGEuQ29kZS5mcm9tQXNzZXQoJ2xhbWJkYScpLFxuICAgICAgICAgICAgaGFuZGxlcjogJ2ZldGNoLWZvbGxvd3MuaGFuZGxlcicsXG4gICAgICAgICAgICBlbnZpcm9ubWVudDoge1xuICAgICAgICAgICAgICAgIFRXSVRURVJfVE9LRU46IHByb2Nlc3MuZW52LlRXSVRURVJfVE9LRU4gYXMgc3RyaW5nLFxuICAgICAgICAgICAgICAgIEZPTExPV1NfVEFCTEVfTkFNRTogZm9sbG93c1RhYmxlLnRhYmxlTmFtZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGZvbGxvd3NUYWJsZS5ncmFudFJlYWRXcml0ZURhdGEoZmV0Y2hGb2xsb3dzKTtcblxuICAgICAgICBuZXcgYXBpZ3cuTGFtYmRhUmVzdEFwaSh0aGlzLCAnRW5kcG9pbnQnLCB7XG4gICAgICAgICAgICBoYW5kbGVyOiBmZXRjaEZvbGxvd3MsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IG5ld0ZvbGxvdyA9IG5ldyBsYW1iZGEuRnVuY3Rpb24odGhpcywgJ05ld0ZvbGxvdycsIHtcbiAgICAgICAgICAgIHJ1bnRpbWU6IGxhbWJkYS5SdW50aW1lLk5PREVKU18xMl9YLFxuICAgICAgICAgICAgY29kZTogbGFtYmRhLkNvZGUuZnJvbUFzc2V0KCdsYW1iZGEnKSxcbiAgICAgICAgICAgIGhhbmRsZXI6ICduZXctZm9sbG93LmhhbmRsZXInLFxuICAgICAgICB9KTtcblxuICAgICAgICBmb2xsb3dzVGFibGUuZ3JhbnRTdHJlYW1SZWFkKG5ld0ZvbGxvdyk7XG5cbiAgICAgICAgbmV3Rm9sbG93LmFkZEV2ZW50U291cmNlTWFwcGluZygnRXZlbnRTb3VyY2VNYXBwaW5nJywge1xuICAgICAgICAgICAgZXZlbnRTb3VyY2VBcm46IGZvbGxvd3NUYWJsZS50YWJsZVN0cmVhbUFybiBhcyBzdHJpbmcsXG4gICAgICAgICAgICBlbmFibGVkOiB0cnVlLFxuICAgICAgICAgICAgc3RhcnRpbmdQb3NpdGlvbjogbGFtYmRhLlN0YXJ0aW5nUG9zaXRpb24uTEFURVNULFxuICAgICAgICAgICAgYmF0Y2hTaXplOiAxLFxuICAgICAgICB9KTtcblxuICAgICAgICBuZXcgVGFibGVWaWV3ZXIodGhpcywgJ1ZpZXdGb2xsb3dlcnMnLCB7XG4gICAgICAgICAgICB0aXRsZTogJ1BtYXJjYSBGb2xsb3dzJyxcbiAgICAgICAgICAgIHRhYmxlOiBmb2xsb3dzVGFibGUsXG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiJdfQ==