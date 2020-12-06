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
        new cdk_dynamo_table_viewer_1.TableViewer(this, 'ViewFollowers', {
            title: 'Pmarca Follows',
            table: followsTable,
        });
    }
}
exports.PmarcaFollowsStack = PmarcaFollowsStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG1hcmNhLWZvbGxvd3Mtc3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwbWFyY2EtZm9sbG93cy1zdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxQ0FBcUM7QUFDckMsOENBQThDO0FBQzlDLGtEQUFrRDtBQUNsRCxpREFBaUQ7QUFDakQscUVBQXNEO0FBRXRELE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUUzQixNQUFhLGtCQUFtQixTQUFRLEdBQUcsQ0FBQyxLQUFLO0lBQzdDLFlBQVksS0FBb0IsRUFBRSxFQUFVLEVBQUUsS0FBc0I7UUFDaEUsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFeEIsTUFBTSxZQUFZLEdBQUcsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUU7WUFDckQsWUFBWSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUU7U0FDcEUsQ0FBQyxDQUFDO1FBRUgsTUFBTSxZQUFZLEdBQUcsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxjQUFjLEVBQUU7WUFDM0QsT0FBTyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVztZQUNuQyxJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDO1lBQ3JDLE9BQU8sRUFBRSx1QkFBdUI7WUFDaEMsV0FBVyxFQUFFO2dCQUNULGFBQWEsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQXVCO2dCQUNsRCxrQkFBa0IsRUFBRSxZQUFZLENBQUMsU0FBUzthQUM3QztTQUNKLENBQUMsQ0FBQztRQUVILFlBQVksQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUU5QyxJQUFJLEtBQUssQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRTtZQUN0QyxPQUFPLEVBQUUsWUFBWTtTQUN4QixDQUFDLENBQUM7UUFFSCxJQUFJLHFDQUFXLENBQUMsSUFBSSxFQUFFLGVBQWUsRUFBRTtZQUNuQyxLQUFLLEVBQUUsZ0JBQWdCO1lBQ3ZCLEtBQUssRUFBRSxZQUFZO1NBQ3RCLENBQUMsQ0FBQztJQUNQLENBQUM7Q0FDSjtBQTdCRCxnREE2QkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBjZGsgZnJvbSAnQGF3cy1jZGsvY29yZSc7XG5pbXBvcnQgKiBhcyBsYW1iZGEgZnJvbSAnQGF3cy1jZGsvYXdzLWxhbWJkYSc7XG5pbXBvcnQgKiBhcyBkeW5hbW9kYiBmcm9tICdAYXdzLWNkay9hd3MtZHluYW1vZGInO1xuaW1wb3J0ICogYXMgYXBpZ3cgZnJvbSAnQGF3cy1jZGsvYXdzLWFwaWdhdGV3YXknO1xuaW1wb3J0IHsgVGFibGVWaWV3ZXIgfSBmcm9tICdjZGstZHluYW1vLXRhYmxlLXZpZXdlcic7XG5cbnJlcXVpcmUoJ2RvdGVudicpLmNvbmZpZygpO1xuXG5leHBvcnQgY2xhc3MgUG1hcmNhRm9sbG93c1N0YWNrIGV4dGVuZHMgY2RrLlN0YWNrIHtcbiAgICBjb25zdHJ1Y3RvcihzY29wZTogY2RrLkNvbnN0cnVjdCwgaWQ6IHN0cmluZywgcHJvcHM/OiBjZGsuU3RhY2tQcm9wcykge1xuICAgICAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKTtcblxuICAgICAgICBjb25zdCBmb2xsb3dzVGFibGUgPSBuZXcgZHluYW1vZGIuVGFibGUodGhpcywgJ0ZvbGxvd3MnLCB7XG4gICAgICAgICAgICBwYXJ0aXRpb25LZXk6IHsgbmFtZTogJ2lkJywgdHlwZTogZHluYW1vZGIuQXR0cmlidXRlVHlwZS5OVU1CRVIgfSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgZmV0Y2hGb2xsb3dzID0gbmV3IGxhbWJkYS5GdW5jdGlvbih0aGlzLCAnRmV0Y2hGb2xsb3dzJywge1xuICAgICAgICAgICAgcnVudGltZTogbGFtYmRhLlJ1bnRpbWUuTk9ERUpTXzEyX1gsXG4gICAgICAgICAgICBjb2RlOiBsYW1iZGEuQ29kZS5mcm9tQXNzZXQoJ2xhbWJkYScpLFxuICAgICAgICAgICAgaGFuZGxlcjogJ2ZldGNoLWZvbGxvd3MuaGFuZGxlcicsXG4gICAgICAgICAgICBlbnZpcm9ubWVudDoge1xuICAgICAgICAgICAgICAgIFRXSVRURVJfVE9LRU46IHByb2Nlc3MuZW52LlRXSVRURVJfVE9LRU4gYXMgc3RyaW5nLFxuICAgICAgICAgICAgICAgIEZPTExPV1NfVEFCTEVfTkFNRTogZm9sbG93c1RhYmxlLnRhYmxlTmFtZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGZvbGxvd3NUYWJsZS5ncmFudFJlYWRXcml0ZURhdGEoZmV0Y2hGb2xsb3dzKTtcblxuICAgICAgICBuZXcgYXBpZ3cuTGFtYmRhUmVzdEFwaSh0aGlzLCAnRW5kcG9pbnQnLCB7XG4gICAgICAgICAgICBoYW5kbGVyOiBmZXRjaEZvbGxvd3MsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIG5ldyBUYWJsZVZpZXdlcih0aGlzLCAnVmlld0ZvbGxvd2VycycsIHtcbiAgICAgICAgICAgIHRpdGxlOiAnUG1hcmNhIEZvbGxvd3MnLFxuICAgICAgICAgICAgdGFibGU6IGZvbGxvd3NUYWJsZSxcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIl19