import { authAdmin } from '../../../application/middlewares';
import { JwtTokenHandler } from "../../../infra/gateways/jwt"
import { PgAdminRepository } from "../../../infra/repos/postgres/repos"
import { listPermissions } from "../../../domain/use-cases/admin"

type TokenInput = string
type FilterInput = { nome?: string }

export class ListPermissionsAdminComposer {
  static async compose (header: TokenInput, filter: FilterInput) {
    const token = new JwtTokenHandler(process.env.stage!)
    const repo = new PgAdminRepository()
    const userId = await authAdmin(token, repo)({ token: header })
    return await listPermissions(repo)(filter)
  }
}
