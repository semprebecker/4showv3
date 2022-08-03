import { APIGatewayProxyEvent } from 'aws-lambda';

import { deleteFn } from '../../__mocks__/aws-sdk/clients/dynamodb';
import { handler } from '../../backend/application/lambda-functions/setup-connection/onDisconnect';
import { envs } from '../../backend/main/config';

describe('onDisconnect function', () => {
  test('Disconnect a user', async () => {
    const result = await handler({ requestContext: { connectionId: '111' } } as APIGatewayProxyEvent);
    expect(result).toEqual({ body: 'Disconnected', statusCode: 200 });
    expect(deleteFn).toHaveBeenCalledWith({
      Key: {
        pk: 'USER',
        sk: 'USER#111',
      },
      TableName: `Stack4showTable${envs.stage.toUpperCase()}`,
    });
  });
});
