import { authUser } from '../../../application/middlewares';
import { JwtTokenHandler } from "../../../infra/gateways/jwt"
import { PgUserRepository } from "../../../infra/repos/postgres/repos"
import { addAddress } from "../../../domain/use-cases/user"

type InputAddress = {
  nome: string,
  logradouro: string,
  numero: number,
  cep: string,
  bairro: string,
  cidade: string,
  complemento: string | null,
  telefone: string,
  selecionado: boolean | null
}

type TokenInput = string

export class AddAddressUserComposer {
  static async compose (header: TokenInput,  address: InputAddress) {
    const token = new JwtTokenHandler(process.env.stage!)
    const repo = new PgUserRepository()
    const userId = await authUser(token, repo)({ token: header })
    return await addAddress(repo)({ idUsuario: userId, ...address })
  }
}
