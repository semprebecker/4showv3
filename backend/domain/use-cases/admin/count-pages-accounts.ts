import { CountAccounts} from '../../contracts/repos';
import { ListProfilesError } from '../../services/errors';

type Input = { limit: number }

type Output = {
  pages: number,
}

type Setup = (repo: CountAccounts) => CountPagesAccounts

export type CountPagesAccounts = (params: Input) => Promise<Output>

export const countPagesAccounts: Setup = (repo) => async params => {
  const { limit } = params
  const num =  await repo.countAccounts()
  if (num) {
    const pages = Math.ceil(Number(num.count) / limit)
    return { pages }
  }
  throw new ListProfilesError()
}
