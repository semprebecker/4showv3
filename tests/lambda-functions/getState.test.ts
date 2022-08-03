import { APIGatewayProxyEvent } from 'aws-lambda';

import { awsSdkPromiseResponse } from '../../__mocks__/aws-sdk/clients/awsSdkPromiseResponse';
import { getFn } from '../../__mocks__/aws-sdk/clients/dynamodb';
import { handler } from '../../backend/application/lambda-functions/setup-connection/getState';

describe('getState function', () => {
  test('User does not exist', async () => {
    awsSdkPromiseResponse.mockReturnValueOnce(Promise.resolve({}));
    const result = await handler({
      requestContext: { connectionId: '123-abc' },
    } as APIGatewayProxyEvent);
    expect(result).toEqual({ body: 'OK', statusCode: 200 });
    expect(getFn).toHaveBeenCalledTimes(1);
  });
});
