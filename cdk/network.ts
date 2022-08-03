import { Stack} from 'aws-cdk-lib';
import { Vpc } from 'aws-cdk-lib/aws-ec2';

import { envs } from '../backend/main/config';

export const getVpc = (scope: Stack): Vpc => {
  return new Vpc(scope, `Stack4showVPC${envs.stage}`, { natGateways: 1})
};
