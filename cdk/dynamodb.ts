import { RemovalPolicy, Stack } from 'aws-cdk-lib';
import { AttributeType, BillingMode, Table } from 'aws-cdk-lib/aws-dynamodb';

import { lambdaFunctions } from './lambda';
import { envs } from '../backend/main/config';

export const getTable = (stack: Stack, fns: lambdaFunctions): Table => {
  const table = new Table(stack, `Stack4showTable${envs.stage.toUpperCase()}`, {
    billingMode: BillingMode.PAY_PER_REQUEST,
    partitionKey: { name: 'pk', type: AttributeType.STRING },
    removalPolicy: RemovalPolicy.DESTROY,
    sortKey: { name: 'sk', type: AttributeType.STRING },
    tableName: `Stack4showTable${envs.stage.toUpperCase()}`,
    timeToLiveAttribute: 'exp',
  });
  table.grantReadWriteData(fns['setup-connection/getState']);
  table.grantWriteData(fns['setup-connection/onConnect']);
  table.grantWriteData(fns['setup-connection/onDisconnect']);
  return table;
};

