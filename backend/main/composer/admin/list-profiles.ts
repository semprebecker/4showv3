import { authAdmin } from '../../../application/middlewares';
import { JwtTokenHandler } from "../../../infra/gateways/jwt"
import { PgAdminRepository } from "../../../infra/repos/postgres/repos"
import { listProfiles } from "../../../domain/use-cases/admin"

type TokenInput = string

export class ListProfilesAdminComposer {
  static async compose (header: TokenInput) {
    const token = new JwtTokenHandler(process.env.stage!)
    const repo = new PgAdminRepository()
    const userId = await authAdmin(token, repo)({ token: header })
    return await listProfiles(repo)()
  }
}
