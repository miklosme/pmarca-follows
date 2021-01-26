# Pmarca Follows

Twitter bot running on AWS CDK. When [@pmarca](https://twitter.com/pmarca) follows somebody, the bot retweets a recent popular tweet from them.

Account: https://twitter.com/pmarca_follows

## Setup
- When setting up, `cp .env-example .env` and fill it with credentials
- Don't forget to NPM install in `lambda/`

Rest is common CDK stuff:

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `npm run test`    perform the jest unit tests
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template
