import { GetUserError } from '../../services/errors';
import { GetUser as Get } from '../../contracts/repos';

type Input = {
  idUsuario: string,
}
type Output = {
  nome: string;
  email: string;
  idPerfil: number;
  nomePerfil: string;
  tipoPessoa: string;
  cpfCnpj: string | null;
  telefone: string;
  ativo: boolean;
}

type Setup = (repo: Get) => GetUser

export type GetUser = (params: Input) => Promise<Output>

export const getUser: Setup = (repo) => async params => {
  const user = await repo.getUser({...params })
  if(user !== undefined) {
    return user
  }
  throw new GetUserError()
}
