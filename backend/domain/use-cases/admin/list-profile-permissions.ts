import { ListProfilePermissions as List } from '../../contracts/repos';
import { ListProfilePermissionsError } from '../../services/errors';

type Input = {
  idPerfil: number,
}

type Output = {
  id: number,
  idPerfil: number,
  idPermissao: number,
  dataCadastro: Date,
  dataAlteracao: Date | null
}[]

type Setup = (repo: List) => ListProfilePermissions

export type ListProfilePermissions = (params: Input) => Promise<Output>

export const listProfilePermissions: Setup = (repo) => async params => {
  const { idPerfil } = params
  const listPermissions = await repo.listProfilePermissions({ idPerfil })
  if(listPermissions.length > 0 || Array.isArray(listPermissions)){
    return listPermissions
  }
  throw new ListProfilePermissionsError()
}
