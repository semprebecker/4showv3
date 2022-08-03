import { CountUsers } from "../../contracts/repos";
import { ListUsersError } from "../../services/errors";

type Input = { limit: number };

type Output = {
  pages: number;
};

type Setup = (repo: CountUsers) => CountPagesUsers;

export type CountPagesUsers = (params: Input) => Promise<Output>;

export const countPagesUsers: Setup = (repo) => async (params) => {
  const { limit } = params;
  const num = await repo.countUsers();
  if (num) {
    const pages = Math.ceil(Number(num.count) / limit);
    return { pages };
  }
  throw new ListUsersError();
};
