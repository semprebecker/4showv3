import { App, Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';

import { getCognitoPool } from '../../cdk/cognito';
import { getFunctions } from '../../cdk/lambda';

describe('Cognito', () => {
  test('returns a cognito users pool', () => {
    const app = new App();
    const stack = new Stack(app, 'ApiTestStack', { env: { account: '123456789', region: 'us-east-1' } });
    getCognitoPool(stack, getFunctions(stack))
    const cfn = Template.fromStack(stack).toJSON();
    const resources = cfn.Resources;
    const matchObject: { Parameters: Record<string, unknown>; Resources: Record<string, unknown> } = {
      Parameters: expect.any(Object),
      Resources: {},
    };
    Object.keys(resources).forEach((res) => {
      switch (resources[res].Type) {
        case 'AWS::Cognito::UserPool':
          matchObject.Resources[res] = {
            Properties: expect.any(Object)
          };
          break;
        default:
          break;
      }
    });

    expect(cfn).toMatchSnapshot(matchObject);
  });
});
