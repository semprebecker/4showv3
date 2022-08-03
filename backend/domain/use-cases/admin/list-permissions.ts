import { ListPermissions as List, ListPermissionByFilter} from '../../contracts/repos';
import { ListPermissionsError } from '../../services/errors';

type Input = { nome?: string }

type Output = {
  idPermissao: number,
  nome: string,
}[]

type Setup = (repo: List & ListPermissionByFilter) => ListPermissions

export type ListPermissions = (params: Input) => Promise<Output>

export const listPermissions: Setup = (repo) => async params => {
  const { nome } = params
  const permissions = nome ? await repo.listPermissionByFilter({ nome }) : await repo.listPermissions()
  if(permissions.length > 0){
    return permissions
  }
  throw new ListPermissionsError()
}
