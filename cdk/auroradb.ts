import { Stack, Duration } from "aws-cdk-lib";
import { BastionHostLinux, IVpc, Port } from "aws-cdk-lib/aws-ec2";
import {
  Credentials,
  DatabaseClusterEngine,
  ParameterGroup,
  ServerlessCluster,
} from "aws-cdk-lib/aws-rds";
import { lambdaFunctions } from "./lambda";

import { envs } from "../backend/main/config";

export const getDatabaseService = (
  scope: Stack,
  vpc: IVpc,
  host: BastionHostLinux,
  fns: lambdaFunctions
): ServerlessCluster => {
  const cluster = new ServerlessCluster(scope, `Aurora-Serverless`, {
    engine: DatabaseClusterEngine.AURORA_POSTGRESQL,
    parameterGroup: ParameterGroup.fromParameterGroupName(
      scope,
      "ParameterGroup",
      "default.aurora-postgresql10"
    ),
    defaultDatabaseName: `${envs.stage}`,
    vpc: vpc,
    enableDataApi: true,
    scaling: { autoPause: Duration.minutes(0) },
    credentials: Credentials.fromGeneratedSecret("serverless"),
  });
  cluster.connections.allowFrom(
    host.connections,
    Port.tcp(cluster.clusterEndpoint.port),
    "Bastion host connection"
  );
  cluster.grantDataApiAccess(fns["setup-connection/getState"]);
  cluster.grantDataApiAccess(fns["user/addUser"]);
  cluster.grantDataApiAccess(fns["user/updateUser"]);
  cluster.grantDataApiAccess(fns["user/getUser"]);
  cluster.grantDataApiAccess(fns["user/addAddress"]);
  cluster.grantDataApiAccess(fns["user/updateAddress"]);
  cluster.grantDataApiAccess(fns["user/getAddresses"]);
  cluster.grantDataApiAccess(fns["admin/listProfiles"]);
  cluster.grantDataApiAccess(fns["admin/listPermissions"]);
  cluster.grantDataApiAccess(fns["admin/manageProfilePermissions"]);
  cluster.grantDataApiAccess(fns["admin/listProfilePermissions"]);
  cluster.grantDataApiAccess(fns["admin/addAccount"]);
  cluster.grantDataApiAccess(fns["admin/updateAccount"]);
  cluster.grantDataApiAccess(fns["admin/deleteAccount"]);
  cluster.grantDataApiAccess(fns["admin/listAccounts"]);
  cluster.grantDataApiAccess(fns["admin/countPagesAccounts"]);
  cluster.grantDataApiAccess(fns["admin/manageAccountLinkedUsers"]);
  cluster.grantDataApiAccess(fns["admin/listAccountLinkedUsers"]);
  cluster.grantDataApiAccess(fns["admin/countPagesUsers"]);
  return cluster;
};
