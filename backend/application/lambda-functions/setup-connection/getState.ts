import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

import { postToConnection } from '../../../infra/gateways/apigtw';
import { User } from '../../../infra/repos/dynamodb/repos';
import { ServerError } from '../../errors';
import { ok } from '../../helpers';

// Request the current game state object.
// This request is issued on UI page load.
export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const cid = event.requestContext.connectionId;
    const gs = await User.get({});
    if (!gs.Item) {
      await User.put({ cid: '' });
    }
    if (cid && gs.Item) {
      await postToConnection(event, cid, JSON.stringify(gs.Item));
    }
    return ok('OK');
  } catch (e: any) {
    throw new ServerError(e);
  }
};
