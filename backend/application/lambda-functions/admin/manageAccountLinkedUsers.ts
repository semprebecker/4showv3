import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

import { postToConnection } from '../../../infra/gateways/apigtw';
import { ManageAccountLinkedUsersAdminModel  } from '../../../types';
import { ManageAccountLinkedUsersAdminComposer } from '../../../main/composer/admin';
import { ok, parseBody } from '../../helpers';
import { ServerError, BadRequestError } from '../../errors';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const { body, headers } = event;
  try {
    if (body) {
      const { request }: ManageAccountLinkedUsersAdminModel = parseBody(body);
      const data = await ManageAccountLinkedUsersAdminComposer.compose(headers.authorization!, request)
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
