import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

import { postToConnection } from '../../../infra/gateways/apigtw';
import { AddAddressUserModel  } from '../../../types';
import { AddAddressUserComposer } from '../../../main/composer/user';
import { ok, parseBody } from '../../helpers';
import { ServerError, BadRequestError } from '../../errors';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const { body, headers } = event;
  try {
    if (body) {
      const { address }: AddAddressUserModel = parseBody(body);
      const data = await AddAddressUserComposer.compose(headers.authorization!, address)
      const cid = event.requestContext.connectionId;
      await postToConnection(event, cid!, JSON.stringify(data));
      return ok(data)
    }
  } catch (e: any) {
    console.log(e)
    throw new ServerError(e);
  }
  throw new BadRequestError();
};
