import { App } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';

import { SetupStack } from '../../cdk/setup-stack';

describe('rest api', () => {
  test('rest api', () => {
    const app = new App();
    const stack = new SetupStack(app, 'Stack4show', { env: { account: '123456789', region: 'us-east-1' } });
    const cfn = Template.fromStack(stack).toJSON();
    const resources = cfn.Resources;
    const matchObject: { Parameters: Record<string, unknown>; Resources: Record<string, unknown> } = {
      Parameters: expect.any(Object),
      Resources: {},
    };
    Object.keys(resources).forEach((res) => {
      switch (resources[res].Type) {
        case 'AWS::IAM::Policy':
          if (res.startsWith('CustomCDKBucketDeployment')) {
            matchObject.Resources[res] = {
              Properties: {
                PolicyDocument: {
                  Statement: expect.any(Array),
                },
              },
            };
          }
          break;
        case 'AWS::Lambda::Function':
          matchObject.Resources[res] = {
            Properties: { Code: expect.any(Object) },
          };
          break;
        case 'Custom::CDKBucketDeployment':
          matchObject.Resources[res] = {
            Properties: {
              SourceBucketNames: expect.any(Array),
              SourceObjectKeys: expect.any(Object),
            },
          };
          break;
        default:
          break;
      }
    });

    expect(cfn).toMatchSnapshot(matchObject);
  });
});
