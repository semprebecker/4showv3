import { App } from 'aws-cdk-lib';

import { SetupStack } from './setup-stack';
import { envs } from '../backend/main/config';

const app = new App();

new SetupStack(app, `4showStack${envs.stage.toUpperCase()}`, {
  description: `4show Stack ${envs.stage.toUpperCase()}`,
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
  stackName: `app-4show-stack-${envs.stage}`,
});
