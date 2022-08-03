import { updateUser } from "../../../domain/use-cases/user"
import { authUser } from '../../../application/middlewares';
import { JwtTokenHandler } from "../../../infra/gateways/jwt"
import { PgUserRepository } from "../../../infra/repos/postgres/repos"

type InputUser = { nome: string, email: string, tipoPessoa: string, cpfCnpj: string | null, telefone: string }
type TokenInput = string

export class UpdateUserComposer {
  static async compose (header: TokenInput, { nome, email, tipoPessoa, cpfCnpj, telefone }: InputUser) {
    const token = new JwtTokenHandler(process.env.stage!)
    const repo = new PgUserRepository()
    const userId = await authUser(token, repo)({ token: header })
    return await updateUser(repo)({
      idUsuario: userId,
      nome: nome,
      email: email,
      cpfCnpj: cpfCnpj,
      telefone: telefone,
      tipoPessoa: tipoPessoa,
    })
  }
}
