import { SecretsManager } from "aws-sdk";

const secret = new SecretsManager();

type Output = {
  secretArn: string;
  resourceArn: string;
  database: string;
  cognitoId: string;
  region: string;
  keyId: string;
  accessKey: string;
};

export const getSecrets = async (): Promise<Output> => {
  const secrets = await secret
    .getSecretValue({ SecretId: process.env.secretsId! })
    .promise();
  return JSON.parse(secrets.SecretString!);
};
