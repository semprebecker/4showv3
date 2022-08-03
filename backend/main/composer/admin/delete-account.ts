import { authAdmin } from '../../../application/middlewares';
import { JwtTokenHandler } from "../../../infra/gateways/jwt"
import { PgAdminRepository } from "../../../infra/repos/postgres/repos"
import { deleteAccount } from "../../../domain/use-cases/admin"

type TokenInput = string
type AccountInput = number

export class DeleteAccountAdminComposer {
  static async compose (header: TokenInput, account: AccountInput) {
    const token = new JwtTokenHandler(process.env.stage!)
    const repo = new PgAdminRepository()
    const userId = await authAdmin(token, repo)({ token: header })
    return await deleteAccount(repo)({ idConta: account })
  }
}
