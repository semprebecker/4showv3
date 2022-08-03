import { authAdmin } from "../../../application/middlewares";
import { JwtTokenHandler } from "../../../infra/gateways/jwt";
import { PgAdminRepository } from "../../../infra/repos/postgres/repos";
import { countPagesUsers } from "../../../domain/use-cases/admin";

type Input = string;
type LimitInput = number;

export class CountPagesUsersAdminComposer {
  static async compose(header: Input, limit: LimitInput) {
    const tokenHandler = new JwtTokenHandler(process.env.stage!);
    const repo = new PgAdminRepository();
    const userId = await authAdmin(tokenHandler, repo)({ token: header });
    return await countPagesUsers(repo)({ limit });
  }
}
