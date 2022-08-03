import { TokenValidator } from '../../domain/contracts/gateways';
import { GetValidAdminId } from '../../domain/contracts/repos';
import { UnauthorizedError } from '../errors/http';

type Input = {
  token: string,
}
type Output = string

type Setup = (auth: TokenValidator, repo: GetValidAdminId) => AuthAdmin

export type AuthAdmin = (params: Input) => Promise<Output>

export const authAdmin: Setup = (auth, repo) => async params => {
  try {
    const idUser = await auth.validate({ token: params.token })
    await repo.getValidAdminId({ idUsuario: idUser })
    return idUser
  } catch (error) {
    throw new UnauthorizedError()
  }
}
