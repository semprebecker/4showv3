import generator from "generate-password";

import { CreateUser } from "../../../domain/contracts/gateways";
import { Cognito } from "./cognito";

export class ApiCognito extends Cognito implements CreateUser {
  async createUserClient({
    email,
  }: CreateUser.Input): Promise<CreateUser.Output> {
    try {
      const poolId = await this.setupConfig();
      const poolData = {
        UserPoolId: poolId.cognitoId,
        Username: email,
        DesiredDeliveryMediums: ["EMAIL"],
        TemporaryPassword: generator.generate({
          length: 8,
          symbols: true,
          numbers: true,
          uppercase: true,
          lowercase: true,
          strict: true,
        }),
        UserAttributes: [
          {
            Name: "email",
            Value: email,
          },
        ],
      };
      const user = await this.cognitoConnection
        .adminCreateUser(poolData)
        .promise();
      return { idUsuario: user.User?.Username! };
    } catch (error: any) {
      console.log(error);
      if (error["code"] === "UsernameExistsException") return error["message"];
      else return undefined;
    }
  }
}
