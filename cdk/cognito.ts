import { Stack } from 'aws-cdk-lib';
import * as cognito from 'aws-cdk-lib/aws-cognito';
import { Effect, PolicyStatement } from 'aws-cdk-lib/aws-iam';

import { envs } from '../backend/main/config';
import { lambdaFunctions } from './lambda';

export const getCognitoPool = (stack: Stack, fns: lambdaFunctions): cognito.UserPool => {
  const pool = new cognito.UserPool(stack, `Users${envs.stage}`, {
    userPoolName: `usuarios${envs.stage}4show`,
    signInAliases: {
      email: true,
    },
    standardAttributes: {
      preferredUsername: {
        required: true,
        mutable: true
      },
      email: {
        required: true,
        mutable: true
      }
    },
    autoVerify: { email: true },
    accountRecovery: cognito.AccountRecovery.EMAIL_ONLY,
    passwordPolicy: {
      minLength: 8,
      requireLowercase: true,
      requireDigits: true,
      requireUppercase: true,
      requireSymbols: true,
    },
  })
  fns['setup-connection/getState'].addToRolePolicy(rolePolicy(pool))
  fns['user/addUser'].addToRolePolicy(rolePolicy(pool))
  return pool;
};

const rolePolicy = (pool: cognito.UserPool) => {
  return new PolicyStatement({
    effect: Effect.ALLOW,
    actions: ['cognito-idp:*'],
    resources: [`arn:aws:cognito-idp:${process.env.CDK_DEFAULT_REGION}:${process.env.CDK_DEFAULT_ACCOUNT}:userpool/${pool.userPoolId}`],
  })
}
