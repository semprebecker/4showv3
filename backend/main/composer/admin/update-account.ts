import { authAdmin } from '../../../application/middlewares';
import { JwtTokenHandler } from "../../../infra/gateways/jwt"
import { PgAdminRepository } from "../../../infra/repos/postgres/repos"
import { updateAccount } from "../../../domain/use-cases/admin"

type TokenInput = string
type AccountInput = {
  idConta: number,
  nome: string,
  email: string,
  tipoPessoa: string,
  cpfCnpj: string,
  telefone: string,
  dataExpiracao: Date,
  nomeParamLive: string,
  porcentagem4Show: number,
  showPoweredBy?: boolean,
};

export class UpdateAccountAdminComposer {
  static async compose (header: TokenInput, account: AccountInput) {
    const token = new JwtTokenHandler(process.env.stage!)
    const repo = new PgAdminRepository()
    const userId = await authAdmin(token, repo)({ token: header })
    return await updateAccount(repo)(account)
  }
}
