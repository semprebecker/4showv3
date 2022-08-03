import { authAdmin } from '../../../application/middlewares';
import { JwtTokenHandler } from "../../../infra/gateways/jwt"
import { PgAdminRepository } from "../../../infra/repos/postgres/repos"
import { listAccounts } from "../../../domain/use-cases/admin"

type Input = {
  token: string,
  filter?: {
    nome?: string,
    cpfCnpj?: string,
    email?: string,
    nomeParamLive?: string,
  },
  pagination: {
    page: number,
    limit: number,
  }
}

export class ListAccountsAdminComposer {
  static async compose ({ token, filter, pagination }: Input) {
    const tokenHandler = new JwtTokenHandler(process.env.stage!)
    const repo = new PgAdminRepository()
    const userId = await authAdmin(tokenHandler, repo)({ token })
    return await listAccounts(repo)({ filter, pagination })
  }
}
