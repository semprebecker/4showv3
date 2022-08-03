import { TokenValidator } from '../../domain/contracts/gateways';
import { GetValidUserId } from '../../domain/contracts/repos';
import { ForbiddendError } from '../errors/http';

type Input = {
  token: string,
}
type Output = string

type Setup = (auth: TokenValidator, repo: GetValidUserId) => AuthUser

export type AuthUser = (params: Input) => Promise<Output>

export const authUser: Setup = (auth, repo) => async params => {
  try {
    const idUser = await auth.validate({ token: params.token })
    await repo.getValidUserId({ idUsuario: idUser })
    return idUser
  } catch (error) {
    throw new ForbiddendError()
  }
}
