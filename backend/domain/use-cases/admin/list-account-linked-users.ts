import { ListAccountLinkedUsers as List } from '../../contracts/repos';
import { ListAccountLinkedUsersError } from '../../services/errors';

type Input = {
  idConta: number,
}

type Output = {
  id: number,
  idConta: number,
  idUsuario: string,
  nome: string,
  email: string,
  tipoPessoa: string,
  cpfCnpj: string | null,
  telefone: string,
  ativo: boolean,
  idPerfil: number,
  nomePerfil: string,
  tipo: string
}[]

type Setup = (repo: List) => ListAccountLinkedUsers

export type ListAccountLinkedUsers = (params: Input) => Promise<Output>

export const listAccountLinkedUsers: Setup = (repo) => async params => {
  const { idConta } = params
  const listAcc = await repo.listAccountLinkedUsers({ idConta })
  if(listAcc.length > 0 || Array.isArray(listAcc)){
    return listAcc
  }
  throw new ListAccountLinkedUsersError()
}
