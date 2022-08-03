import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

import { postToConnection } from '../../../infra/gateways/apigtw';
import { ListProfilePermissionsAdminModel  } from '../../../types';
import { ListPerfilPermissionsAdminComposer } from '../../../main/composer/admin';
import { ok, parseBody } from '../../helpers';
import { ServerError, BadRequestError } from '../../errors';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const { body, headers } = event;
  try {
    if (body) {
      const { idPerfil }: ListProfilePermissionsAdminModel = parseBody(body);
      const data = await ListPerfilPermissionsAdminComposer.compose(headers.authorization!, { idPerfil })
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
