import { CfnOutput, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';

import { getApiGateway } from './apigw';
import { getTable } from './dynamodb';
import { getFunctions } from './lambda';
import { getWebsite } from './website';
import { getSecrets } from './secrets-manager';
import { getVpc } from './network';
import { getBastionHost } from './bastion-host';
import { getDatabaseService } from './auroradb';
import { getCognitoPool } from './cognito';

export class SetupStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const fns = getFunctions(this);

    getCognitoPool(this, fns)

    const [apigw, stage] = getApiGateway(this, fns);

    const webUrl = getWebsite(this, apigw);

    getTable(this, fns);

    getSecrets(this, fns)

    const vpc = getVpc(this)

    const host = getBastionHost(this, vpc)

    getDatabaseService(this, vpc, host, fns)

    new CfnOutput(this, 'webUrl', { value: webUrl });
    new CfnOutput(this, 'wsUrl', { value: `${apigw.apiEndpoint}/${stage.stageName}` });
  }
}
