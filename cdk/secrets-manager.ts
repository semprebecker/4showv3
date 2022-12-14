import { Stack } from "aws-cdk-lib";
import * as secretsmanager from "aws-cdk-lib/aws-secretsmanager";
import { lambdaFunctions } from "./lambda";

import { envs } from "../backend/main/config";

export const getSecrets = (
  stack: Stack,
  fns: lambdaFunctions
): secretsmanager.Secret => {
  const secret = new secretsmanager.Secret(stack, envs.stage, {
    description: `Generated by the CDK for stack: 4show-stack-${envs.stage}`,
  });
  secret.grantWrite(fns["setup-connection/getState"]);
  secret.grantWrite(fns["setup-connection/onConnect"]);
  secret.grantWrite(fns["setup-connection/onDisconnect"]);
  secret.grantRead(fns["user/addUser"]);
  secret.grantRead(fns["user/updateUser"]);
  secret.grantRead(fns["user/getUser"]);
  secret.grantRead(fns["user/addAddress"]);
  secret.grantRead(fns["user/updateAddress"]);
  secret.grantRead(fns["user/getAddresses"]);
  secret.grantRead(fns["admin/listProfiles"]);
  secret.grantRead(fns["admin/listPermissions"]);
  secret.grantRead(fns["admin/manageProfilePermissions"]);
  secret.grantRead(fns["admin/listProfilePermissions"]);
  secret.grantRead(fns["admin/addAccount"]);
  secret.grantRead(fns["admin/updateAccount"]);
  secret.grantRead(fns["admin/deleteAccount"]);
  secret.grantRead(fns["admin/listAccounts"]);
  secret.grantRead(fns["admin/countPagesAccounts"]);
  secret.grantRead(fns["admin/manageAccountLinkedUsers"]);
  secret.grantRead(fns["admin/listAccountLinkedUsers"]);
  secret.grantRead(fns["admin/countPagesUsers"]);
  return secret;
};
