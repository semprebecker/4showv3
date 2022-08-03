import { CpfCnpjInvalidError, TypePersonInvalidError, UpdateUserError } from '../../services/errors';
import { UpdateUser as Update } from '../../contracts/repos';
import { validateTypeUser, validateCpfCnpj } from '../../services';

type Input = {
  idUsuario: string,
  nome: string;
  email: string;
  tipoPessoa: string;
  cpfCnpj: string | null;
  telefone: string;
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
} | undefined

type Setup = (repo: Update) => UpdateUser

export type UpdateUser = (params: Input) => Promise<Output>

export const updateUser: Setup = (repo) => async params => {
  const { cpfCnpj, tipoPessoa } = params
  if(!validateTypeUser(tipoPessoa)) throw new TypePersonInvalidError()
  if(cpfCnpj && !validateCpfCnpj(cpfCnpj)) throw new CpfCnpjInvalidError()
  const update = await repo.updateUser({...params})
  if(update !== undefined) {
    return update
  }
  throw new UpdateUserError()
}
