import { addUserClient } from "../../../domain/use-cases/user"
import { ApiCognito } from "../../../infra/gateways/cognito"
import { JwtTokenHandler } from "../../../infra/gateways/jwt"
import { PgUserRepository } from "../../../infra/repos/postgres/repos"

type Input = { nome: string, email: string, tipoPessoa: string, cpfCnpj: string | null, telefone: string }

export class AddUserComposer {
  static async compose ({ nome, email, tipoPessoa, cpfCnpj, telefone }: Input) {
    const token = new JwtTokenHandler(process.env.stage!)
    const cognito = new ApiCognito()
    const repo = new PgUserRepository()
    return await addUserClient(token, cognito, repo)({
      nome: nome,
      email: email,
      cpfCnpj: cpfCnpj,
      telefone: telefone,
      tipoPessoa: tipoPessoa,
    })
  }
}
