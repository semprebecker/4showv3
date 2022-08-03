import { Stack } from 'aws-cdk-lib';
import { BastionHostLinux, IVpc  } from 'aws-cdk-lib/aws-ec2';

import { envs } from '../backend/main/config';

export const getBastionHost = (scope: Stack, vpc: IVpc): BastionHostLinux => {
  return new BastionHostLinux(scope, `Bastion4show${envs.stage}`, { vpc: vpc, instanceName: `bastion-host-4show-${envs.stage}`})
};
