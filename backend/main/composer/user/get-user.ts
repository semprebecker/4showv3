import { getUser } from "../../../domain/use-cases/user"
import { authUser } from '../../../application/middlewares';
import { JwtTokenHandler } from "../../../infra/gateways/jwt"
import { PgUserRepository } from "../../../infra/repos/postgres/repos"

type TokenInput = string

export class GetUserComposer {
  static async compose (header: TokenInput) {
    const token = new JwtTokenHandler(process.env.stage!)
    const repo = new PgUserRepository()
    const userId = await authUser(token, repo)({ token: header })
    return await getUser(repo)({ idUsuario: userId })
  }
}
