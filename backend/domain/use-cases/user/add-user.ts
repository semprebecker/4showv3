import { AddUserError, CpfCnpjInvalidError, TypePersonInvalidError } from '../../services/errors';
import { AccessToken, validateCpfCnpj, validateTypeUser } from '../../services';
import { CreateUser, TokenGenerator } from '../../contracts/gateways';
import { AddUser } from '../../contracts/repos';

type Input = {
  nome: string;
  email: string;
  tipoPessoa: string;
  cpfCnpj: string | null;
  telefone: string;
}
type Output = { accessToken: string }

type Setup = (
  token: TokenGenerator,
  cognito: CreateUser,
  repo: AddUser) => AddUserClient

export type AddUserClient = (params: Input) => Promise<Output>

export const addUserClient: Setup = (token, cognito, repo) => async params => {
  const { cpfCnpj, tipoPessoa } = params
  if(!validateTypeUser(tipoPessoa)) throw new TypePersonInvalidError()
  if(cpfCnpj && !validateCpfCnpj(cpfCnpj)) throw new CpfCnpjInvalidError()
  const create = await cognito.createUserClient({ email: params.email})
  if(create !== undefined && typeof create !== 'string') {
    const pgUser = await repo.addUserClient({ idUsuario: create.idUsuario, ...params })
    const accessToken = await token.generate({ key: pgUser.idUsuario.toString(), expirationInMs: AccessToken.expirationInMs })
    return { accessToken }
  }
  throw new AddUserError(create)
}
