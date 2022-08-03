import { authAdmin } from '../../../application/middlewares';
import { JwtTokenHandler } from "../../../infra/gateways/jwt"
import { PgAdminRepository } from "../../../infra/repos/postgres/repos"
import { listProfilePermissions } from "../../../domain/use-cases/admin"

type TokenInput = string
type IdProfileInput = {
  idPerfil: number,
};

export class ListPerfilPermissionsAdminComposer {
  static async compose (header: TokenInput, idPerfil: IdProfileInput) {
    const token = new JwtTokenHandler(process.env.stage!)
    const repo = new PgAdminRepository()
    const userId = await authAdmin(token, repo)({ token: header })
    return await listProfilePermissions(repo)(idPerfil)
  }
}
