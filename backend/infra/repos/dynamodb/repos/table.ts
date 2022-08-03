import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { Table } from 'dynamodb-toolbox';

import { envs } from '../../../../main/config';

export const db = new DocumentClient();

export const tableName = process.env.stage === undefined ?
`Stack4showTable${envs.stage.toUpperCase()}` :
`Stack4showTable${process.env.stage!.toUpperCase()}`;

export const StackTable = new Table({
  name: tableName,
  partitionKey: 'pk',
  sortKey: 'sk',
  DocumentClient: db,
});
