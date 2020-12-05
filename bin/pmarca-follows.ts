#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { PmarcaFollowsStack } from '../lib/pmarca-follows-stack';

const app = new cdk.App();
new PmarcaFollowsStack(app, 'PmarcaFollowsStack');
