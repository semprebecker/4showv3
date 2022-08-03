import { authAdmin } from '../../../application/middlewares';
import { JwtTokenHandler } from "../../../infra/gateways/jwt"
import { PgAdminRepository } from "../../../infra/repos/postgres/repos"
import { manageAccountLinkedUsers } from "../../../domain/use-cases/admin"

type TokenInput = string
type BodyInput = {
  idConta: number,
  bind: {
    idUsuario: string,
    idPerfil: number
  }[]
};

export class ManageAccountLinkedUsersAdminComposer {
  static async compose (header: TokenInput, data: BodyInput) {
    const token = new JwtTokenHandler(process.env.stage!)
    const repo = new PgAdminRepository()
    const userId = await authAdmin(token, repo)({ token: header })
    return await manageAccountLinkedUsers(repo)(data)
  }
}
