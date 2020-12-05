#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("source-map-support/register");
const cdk = require("@aws-cdk/core");
const pmarca_follows_stack_1 = require("../lib/pmarca-follows-stack");
const app = new cdk.App();
new pmarca_follows_stack_1.PmarcaFollowsStack(app, 'PmarcaFollowsStack');
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG1hcmNhLWZvbGxvd3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwbWFyY2EtZm9sbG93cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSx1Q0FBcUM7QUFDckMscUNBQXFDO0FBQ3JDLHNFQUFpRTtBQUVqRSxNQUFNLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUMxQixJQUFJLHlDQUFrQixDQUFDLEdBQUcsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiIyEvdXNyL2Jpbi9lbnYgbm9kZVxuaW1wb3J0ICdzb3VyY2UtbWFwLXN1cHBvcnQvcmVnaXN0ZXInO1xuaW1wb3J0ICogYXMgY2RrIGZyb20gJ0Bhd3MtY2RrL2NvcmUnO1xuaW1wb3J0IHsgUG1hcmNhRm9sbG93c1N0YWNrIH0gZnJvbSAnLi4vbGliL3BtYXJjYS1mb2xsb3dzLXN0YWNrJztcblxuY29uc3QgYXBwID0gbmV3IGNkay5BcHAoKTtcbm5ldyBQbWFyY2FGb2xsb3dzU3RhY2soYXBwLCAnUG1hcmNhRm9sbG93c1N0YWNrJyk7XG4iXX0=