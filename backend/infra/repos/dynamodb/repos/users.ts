import { Entity } from 'dynamodb-toolbox';

import { UserModel } from '../entities';
import { StackTable } from './table';

export const User = new Entity<UserModel>({
  name: 'User',
  attributes: {
    pk: { default: () => 'USER', partitionKey: true },
    sk: { default: (data: UserModel) => `USER#${data.cid}`, sortKey: true },
    cid: { type: 'string' },
    exp: { type: 'number' },
  },
  table: StackTable,
});
