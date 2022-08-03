import { DeleteAccount as Delete } from '../../contracts/repos';
import { DeleteAccountError } from '../../services/errors';

type Input = {
  idConta: number,
}

type Output = undefined | Error

type Setup = (repo: Delete) => DeleteAccount

export type DeleteAccount = (params: Input) => Promise<Output>

export const deleteAccount: Setup = (repo) => async params => {
  const acc = await repo.deleteAccount({ ...params })
  if(acc === undefined){
    return acc
  }
  throw new DeleteAccountError()
}
