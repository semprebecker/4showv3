import { App, Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';

import { getApiGateway } from '../../cdk/apigw';
import { getFunctions } from '../../cdk/lambda';
import { getCognitoPool } from '../../cdk/cognito';
import { getWebsite } from '../../cdk/website';

describe('web components', () => {
  test('return website', () => {
    const app = new App();
    const stack = new Stack(app, 'ApiTestStack', { env: { account: '123456789', region: 'us-east-1' } });
    getWebsite(stack, getApiGateway(stack, getFunctions(stack), getCognitoPool(stack))[0]);
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
