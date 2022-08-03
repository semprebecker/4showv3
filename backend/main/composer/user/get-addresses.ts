import { authUser } from '../../../application/middlewares';
import { JwtTokenHandler } from "../../../infra/gateways/jwt"
import { PgUserRepository } from "../../../infra/repos/postgres/repos"
import { getAddresses } from "../../../domain/use-cases/user"

type TokenInput = string

export class GetAddressesUserComposer {
  static async compose (header: TokenInput) {
    const token = new JwtTokenHandler(process.env.stage!)
    const repo = new PgUserRepository()
    const userId = await authUser(token, repo)({ token: header })
    return await getAddresses(repo)({ idUsuario: userId })
  }
}
