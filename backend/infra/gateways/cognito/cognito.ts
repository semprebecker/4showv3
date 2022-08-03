import * as AWS from "aws-sdk";

import { getSecrets } from "../secretsmanager";

type Output = { cognitoId: string };

export class Cognito {
  protected cognitoConnection;
  constructor() {
    this.cognitoConnection = new AWS.CognitoIdentityServiceProvider({
      apiVersion: "2016-04-18",
    });
  }

  protected async setupConfig(): Promise<Output> {
    const secrets = await getSecrets();
    this.cognitoConnection.config.credentials!.accessKeyId = secrets.keyId;
    this.cognitoConnection.config.credentials!.secretAccessKey =
      secrets.accessKey;
    return { cognitoId: secrets.cognitoId };
  }
}
