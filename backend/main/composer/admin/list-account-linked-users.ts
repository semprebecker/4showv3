import { authAdmin } from '../../../application/middlewares';
import { JwtTokenHandler } from "../../../infra/gateways/jwt"
import { PgAdminRepository } from "../../../infra/repos/postgres/repos"
import { listAccountLinkedUsers } from "../../../domain/use-cases/admin"

type TokenInput = string
type IdAccountInput = {
  idConta: number,
};

export class ListAccountLinkedUsersAdminComposer {
  static async compose (header: TokenInput, idConta: IdAccountInput) {
    const token = new JwtTokenHandler(process.env.stage!)
    const repo = new PgAdminRepository()
    const userId = await authAdmin(token, repo)({ token: header })
    return await listAccountLinkedUsers(repo)(idConta)
  }
}
