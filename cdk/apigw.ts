import { WebSocketApi, WebSocketStage } from "@aws-cdk/aws-apigatewayv2-alpha";
import { WebSocketLambdaIntegration } from "@aws-cdk/aws-apigatewayv2-integrations-alpha";
import { RemovalPolicy, Stack } from "aws-cdk-lib";
import { CfnAccount } from "aws-cdk-lib/aws-apigateway";
import { CfnModel, CfnRoute, CfnStage } from "aws-cdk-lib/aws-apigatewayv2";
import {
  ManagedPolicy,
  PolicyStatement,
  Role,
  ServicePrincipal,
} from "aws-cdk-lib/aws-iam";
import { Function as LambdaFunction } from "aws-cdk-lib/aws-lambda";
import { LogGroup, RetentionDays } from "aws-cdk-lib/aws-logs";
import * as cognito from "aws-cdk-lib/aws-cognito";

import { MessageAction } from "../backend/types";
import { getCfnAuthorizer } from "./authorizer";
import { lambdaFunctions } from "./lambda";
import { getModels } from "./models";
import { envs } from "../backend/main/config";

export const stageName = envs.stage;

/*
 * Utility function for adding a route with a model.
 * This is not supported in the L2 constuct so we must drop to
 * L1 (Cfn) by casting the `WebSocketRoute` to `CfnRoute` (`AWS::ApiGatewayV2::Route`)
 */
const addRoute = (
  handler: LambdaFunction,
  action: MessageAction,
  model: CfnModel,
  webSocketApi: WebSocketApi
) => {
  const route = webSocketApi.addRoute(action, {
    integration: new WebSocketLambdaIntegration(
      `${action}Integration`,
      handler
    ),
  });
  const rt = route.node.defaultChild as CfnRoute;

  rt.modelSelectionExpression = "$request.body.action";
  rt.requestModels = { [action]: model.name };

  rt.addDependsOn(model);
};

/*
 * Again, we need to extend the `WebSocketStage` construct by casting it to `CfnStage` (`AWS::ApiGatewayV2::Stage`).
 */
const getStageAndLogs = (
  scope: Stack,
  webSocketApi: WebSocketApi
): WebSocketStage => {
  // Unlike RestApi, you don't get a default `prod` stage automatically.
  const stage = new WebSocketStage(scope, `${envs.stage.toUpperCase()}Stage`, {
    autoDeploy: true,
    stageName,
    webSocketApi,
  });
  // Manage the log group
  new LogGroup(scope, "ExecutionLogs", {
    logGroupName: `/aws/apigateway/${webSocketApi.apiId}/${stageName}`,
    removalPolicy: RemovalPolicy.DESTROY,
    retention: RetentionDays.ONE_WEEK,
  });
  const log = new LogGroup(scope, "AccessLogs", {
    removalPolicy: RemovalPolicy.DESTROY,
    retention: RetentionDays.ONE_WEEK,
  });
  const cfnStage = stage.node.defaultChild as CfnStage;
  cfnStage.accessLogSettings = {
    destinationArn: log.logGroupArn,
    format: `$context.identity.sourceIp - - [$context.requestTime] "$context.httpMethod $context.routeKey $context.protocol" $context.status $context.responseLength $context.requestId`,
  };
  cfnStage.defaultRouteSettings = {
    dataTraceEnabled: true,
    loggingLevel: "INFO",
    throttlingBurstLimit: 500,
    throttlingRateLimit: 1000,
  };

  /*
   * This role is automatically created by the RestApi construct but not by WebSocketApi.
   * CfnAccount isn't even available in the `aws-cdk-lib/aws-apigatewayv2` lib so we must import `aws-cdk-lib/aws-apigateway`
   * to create the CloudWatch role.
   */
  const cwRole = new Role(scope, "CWRole", {
    assumedBy: new ServicePrincipal("apigateway.amazonaws.com"),
    managedPolicies: [
      ManagedPolicy.fromAwsManagedPolicyName(
        "service-role/AmazonAPIGatewayPushToCloudWatchLogs"
      ),
    ],
  });

  const account = new CfnAccount(scope, "Account", {
    cloudWatchRoleArn: cwRole.roleArn,
  });

  webSocketApi.node.addDependency(account);
  return stage;
};

export const getApiGateway = (
  scope: Stack,
  fns: lambdaFunctions
): [WebSocketApi, WebSocketStage] => {
  const webSocketApi = new WebSocketApi(
    scope,
    `WebSocketApi4show${envs.stage.toUpperCase()}`,
    {
      connectRouteOptions: {
        integration: new WebSocketLambdaIntegration(
          "OnConnectIntegration",
          fns["setup-connection/onConnect"]
        ),
      },
      disconnectRouteOptions: {
        integration: new WebSocketLambdaIntegration(
          "OnDisconnectIntegration",
          fns["setup-connection/onDisconnect"]
        ),
      },
    }
  );

  const {
    getStateModel,
    addUser,
    updateUser,
    getUser,
    addAddressUser,
    updateAddressUser,
    getAddressesUser,
    listProfilesAdmin,
    listPermissionsAdmin,
    manageProfilePermissionsAdmin,
    listProfilePermissionsAdmin,
    addAccountAdmin,
    updateAccountAdmin,
    deleteAccountAdmin,
    listAccountsAdmin,
    countPagesAccountsAdmin,
    manageAccountLinkedUsersAdmin,
    listAccountLinkedUsersAdmin,
    countPagesUsersAdmin,
  } = getModels(scope, webSocketApi);

  getCfnAuthorizer(scope, webSocketApi, fns["setup-connection/authorizer"]);

  addRoute(
    fns["setup-connection/getState"],
    MessageAction.GET_STATE,
    getStateModel,
    webSocketApi
  );

  addRoute(fns["user/addUser"], MessageAction.ADD_USER, addUser, webSocketApi);

  addRoute(
    fns["user/updateUser"],
    MessageAction.UPDATE_USER,
    updateUser,
    webSocketApi
  );

  addRoute(fns["user/getUser"], MessageAction.GET_USER, getUser, webSocketApi);

  addRoute(
    fns["user/addAddress"],
    MessageAction.ADD_ADDRESS_USER,
    addAddressUser,
    webSocketApi
  );

  addRoute(
    fns["user/updateAddress"],
    MessageAction.UPDATE_ADDRESS_USER,
    updateAddressUser,
    webSocketApi
  );

  addRoute(
    fns["user/getAddresses"],
    MessageAction.GET_ADDRESSES_USER,
    getAddressesUser,
    webSocketApi
  );

  addRoute(
    fns["admin/listProfiles"],
    MessageAction.LIST_PROFILES,
    listProfilesAdmin,
    webSocketApi
  );

  addRoute(
    fns["admin/listPermissions"],
    MessageAction.LIST_PERMISSIONS,
    listPermissionsAdmin,
    webSocketApi
  );

  addRoute(
    fns["admin/manageProfilePermissions"],
    MessageAction.MANAGE_PROFILE_PERMISSIONS,
    manageProfilePermissionsAdmin,
    webSocketApi
  );

  addRoute(
    fns["admin/listProfilePermissions"],
    MessageAction.LIST_PROFILE_PERMISSIONS,
    listProfilePermissionsAdmin,
    webSocketApi
  );

  addRoute(
    fns["admin/addAccount"],
    MessageAction.ADD_ACCOUNT,
    addAccountAdmin,
    webSocketApi
  );

  addRoute(
    fns["admin/updateAccount"],
    MessageAction.UPDATE_ACCOUNT,
    updateAccountAdmin,
    webSocketApi
  );

  addRoute(
    fns["admin/deleteAccount"],
    MessageAction.DELETE_ACCOUNT,
    deleteAccountAdmin,
    webSocketApi
  );

  addRoute(
    fns["admin/listAccounts"],
    MessageAction.LIST_ACCOUNTS,
    listAccountsAdmin,
    webSocketApi
  );

  addRoute(
    fns["admin/countPagesAccounts"],
    MessageAction.COUNT_PAGES_ACCOUNTS,
    countPagesAccountsAdmin,
    webSocketApi
  );

  addRoute(
    fns["admin/manageAccountLinkedUsers"],
    MessageAction.MANAGE_ACCOUNT_LINKED_USERS,
    manageAccountLinkedUsersAdmin,
    webSocketApi
  );

  addRoute(
    fns["admin/listAccountLinkedUsers"],
    MessageAction.LIST_ACCOUNT_LINKED_USERS,
    listAccountLinkedUsersAdmin,
    webSocketApi
  );

  addRoute(
    fns["admin/countPagesUsers"],
    MessageAction.COUNT_PAGES_USERS,
    countPagesUsersAdmin,
    webSocketApi
  );

  // These functions need to be able to manage websocket connections.
  [
    fns["setup-connection/getState"],
    fns["user/addUser"],
    fns["user/updateUser"],
    fns["user/getUser"],
    fns["user/addAddress"],
    fns["user/updateAddress"],
    fns["user/getAddresses"],
    fns["admin/listProfiles"],
    fns["admin/listPermissions"],
    fns["admin/manageProfilePermissions"],
    fns["admin/listProfilePermissions"],
    fns["admin/addAccount"],
    fns["admin/updateAccount"],
    fns["admin/deleteAccount"],
    fns["admin/listAccounts"],
    fns["admin/countPagesAccounts"],
    fns["admin/manageAccountLinkedUsers"],
    fns["admin/listAccountLinkedUsers"],
    fns["admin/countPagesUsers"],
  ].forEach((fn) =>
    fn.addToRolePolicy(
      new PolicyStatement({
        actions: ["execute-api:ManageConnections"],
        resources: [
          `arn:aws:execute-api:${process.env.CDK_DEFAULT_REGION}:${process.env.CDK_DEFAULT_ACCOUNT}:${webSocketApi.apiId}/*`,
        ],
      })
    )
  );

  return [webSocketApi, getStageAndLogs(scope, webSocketApi)];
};
