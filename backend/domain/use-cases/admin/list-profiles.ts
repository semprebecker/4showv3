import { ListProfiles as List} from '../../contracts/repos';
import { ListProfilesError } from '../../services/errors';

type Output = {
  idPerfil: number,
  nome: string,
}[]

type Setup = (repo: List) => ListProfiles

export type ListProfiles = () => Promise<Output>

export const listProfiles: Setup = (repo) => async () => {
  const profiles =  await repo.listProfiles()
  if(profiles.length > 0){
    return profiles
  }
  throw new ListProfilesError()
}
