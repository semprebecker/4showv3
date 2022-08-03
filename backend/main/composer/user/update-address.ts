import { authUser } from '../../../application/middlewares';
import { JwtTokenHandler } from "../../../infra/gateways/jwt"
import { PgUserRepository } from "../../../infra/repos/postgres/repos"
import { updateAddress } from "../../../domain/use-cases/user"

type InputAddress = {
  idEndereco: number,
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

export class UpdateAddressUserComposer {
  static async compose (header: TokenInput, address: InputAddress) {
    const token = new JwtTokenHandler(process.env.stage!)
    const repo = new PgUserRepository()
    const userId = await authUser(token, repo)({ token: header })
    return await updateAddress(repo)({ idUsuario: userId, ...address })
  }
}
