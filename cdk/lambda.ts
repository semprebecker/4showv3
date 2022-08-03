import { Duration, Stack } from "aws-cdk-lib";
import { Function as LambdaFunction, Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";

import { envs } from "../backend/main/config/env";

const functionNames = [
  "setup-connection/authorizer",
  "setup-connection/getState",
  "setup-connection/onConnect",
  "setup-connection/onDisconnect",
  "user/addUser",
  "user/updateUser",
  "user/getUser",
  "user/addAddress",
  "user/updateAddress",
  "user/getAddresses",
  "admin/listProfiles",
  "admin/listPermissions",
  "admin/manageProfilePermissions",
  "admin/listProfilePermissions",
  "admin/addAccount",
  "admin/updateAccount",
  "admin/deleteAccount",
  "admin/listAccounts",
  "admin/countPagesAccounts",
  "admin/manageAccountLinkedUsers",
  "admin/listAccountLinkedUsers",
  "admin/countPagesUsers",
] as const;

export type lambdaFunctions = {
  [key in typeof functionNames[number]]: LambdaFunction;
};

// Same props for all functions. This is probably fine for demonstration purposes,
// but we could find exceptions in a real-world scenario.
const lambdaProps = {
  bundling: {
    externalModules: [],
  },
  runtime: Runtime.NODEJS_14_X,
  timeout: Duration.minutes(1),
};

export const getFunctions = (scope: Stack): lambdaFunctions => {
  return functionNames.reduce(
    (prev, fn) => ({
      ...prev,
      [fn]: new NodejsFunction(scope, `${fn}Function`, {
        ...lambdaProps,
        entry: `${__dirname}/../backend/application/lambda-functions/${fn}.ts`,
        environment: {
          stage: envs.stage,
          secretsId: envs.secretsId,
        },
      }),
    }),
    {} as lambdaFunctions
  );
};
