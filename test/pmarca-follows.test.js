"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = require("@aws-cdk/assert");
const cdk = require("@aws-cdk/core");
const PmarcaFollows = require("../lib/pmarca-follows-stack");
test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new PmarcaFollows.PmarcaFollowsStack(app, 'MyTestStack');
    // THEN
    assert_1.expect(stack).to(assert_1.matchTemplate({
        "Resources": {}
    }, assert_1.MatchStyle.EXACT));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG1hcmNhLWZvbGxvd3MudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInBtYXJjYS1mb2xsb3dzLnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw0Q0FBaUY7QUFDakYscUNBQXFDO0FBQ3JDLDZEQUE2RDtBQUU3RCxJQUFJLENBQUMsYUFBYSxFQUFFLEdBQUcsRUFBRTtJQUNyQixNQUFNLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUMxQixPQUFPO0lBQ1AsTUFBTSxLQUFLLEdBQUcsSUFBSSxhQUFhLENBQUMsa0JBQWtCLENBQUMsR0FBRyxFQUFFLGFBQWEsQ0FBQyxDQUFDO0lBQ3ZFLE9BQU87SUFDUCxlQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLHNCQUFhLENBQUM7UUFDaEMsV0FBVyxFQUFFLEVBQUU7S0FDaEIsRUFBRSxtQkFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUE7QUFDekIsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBleHBlY3QgYXMgZXhwZWN0Q0RLLCBtYXRjaFRlbXBsYXRlLCBNYXRjaFN0eWxlIH0gZnJvbSAnQGF3cy1jZGsvYXNzZXJ0JztcbmltcG9ydCAqIGFzIGNkayBmcm9tICdAYXdzLWNkay9jb3JlJztcbmltcG9ydCAqIGFzIFBtYXJjYUZvbGxvd3MgZnJvbSAnLi4vbGliL3BtYXJjYS1mb2xsb3dzLXN0YWNrJztcblxudGVzdCgnRW1wdHkgU3RhY2snLCAoKSA9PiB7XG4gICAgY29uc3QgYXBwID0gbmV3IGNkay5BcHAoKTtcbiAgICAvLyBXSEVOXG4gICAgY29uc3Qgc3RhY2sgPSBuZXcgUG1hcmNhRm9sbG93cy5QbWFyY2FGb2xsb3dzU3RhY2soYXBwLCAnTXlUZXN0U3RhY2snKTtcbiAgICAvLyBUSEVOXG4gICAgZXhwZWN0Q0RLKHN0YWNrKS50byhtYXRjaFRlbXBsYXRlKHtcbiAgICAgIFwiUmVzb3VyY2VzXCI6IHt9XG4gICAgfSwgTWF0Y2hTdHlsZS5FWEFDVCkpXG59KTtcbiJdfQ==