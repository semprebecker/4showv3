import { AddProfilePermission, ListProfilePermissions, DeleteProfilePermissions } from '../../contracts/repos';
import { ManageProfilePermissionsError } from '../../services/errors';

type Input = {
  idPerfil: number,
  permissionsId: number[]
}

type Output = {
  id: number,
  idPerfil: number,
  idPermissao: number,
  dataCadastro: Date,
  dataAlteracao: Date | null
}[]

type Setup = (repo: AddProfilePermission & ListProfilePermissions & DeleteProfilePermissions) => ManageProfilePermissions

export type ManageProfilePermissions = (params: Input) => Promise<Output>

export const manageProfilePermissions: Setup = (repo) => async params => {
  const { idPerfil, permissionsId } = params
  const listPermissions = await repo.listProfilePermissions({ idPerfil })
  if(listPermissions.length > 0 && Array.isArray(listPermissions)){
    const arrayAdd: { idPerfil: number, idPermissao: number }[] = []
    for (const permission of permissionsId) {
      if(!listPermissions.map(p => p.idPermissao).includes(permission)){
        arrayAdd.push({ idPerfil, idPermissao: permission })
      }
    }
    await repo.batchAddProfilePermission(arrayAdd)
    const arrayDelete: { id: number }[] = []
    for (const permission of listPermissions) {
      if(!permissionsId.includes(permission.idPermissao)){
        arrayDelete.push({ id: permission.id })
      }
    }
    await repo.batchDeleteProfilePermissions(arrayDelete)
  } else {
    const arrayAdd: { idPerfil: number, idPermissao: number }[] = []
    for (const id of permissionsId) {
      arrayAdd.push({ idPerfil, idPermissao: id })
    }
    await repo.batchAddProfilePermission(arrayAdd)
  }
  const permissions = await repo.listProfilePermissions({ idPerfil })
  if(permissions.length > 0 || Array.isArray(permissions)){
    return permissions
  }
  throw new ManageProfilePermissionsError()
}
