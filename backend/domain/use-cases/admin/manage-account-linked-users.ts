import { LinkUserAccount, ListAccountLinkedUsers, DeleteLinkedUserAccount } from '../../contracts/repos';
import { ManageAccountLinkedUsersError } from '../../services/errors';

type Input = {
  idConta: number,
  bind: {
    idUsuario: string,
    idPerfil: number
  }[]
}

type Output = {
  id: number,
  idConta: number,
  idUsuario: string,
  nome: string,
  email: string,
  tipoPessoa: string,
  cpfCnpj: string | null,
  telefone: string,
  ativo: boolean,
  idPerfil: number,
  nomePerfil: string,
  tipo: string
}[]

type Setup = (repo: LinkUserAccount & ListAccountLinkedUsers & DeleteLinkedUserAccount) => ManageAccountLinkedUsers

export type ManageAccountLinkedUsers = (params: Input) => Promise<Output>

export const manageAccountLinkedUsers: Setup = (repo) => async params => {
  const { idConta, bind } = params
  const listLikedAcc = await repo.listAccountLinkedUsers({ idConta })
  if (listLikedAcc.length > 0 && Array.isArray(listLikedAcc)) {
    const arrayLink: { idConta: number, idUsuario: string, idPerfil: number }[] = []
    for (const link of bind) {
      if (!listLikedAcc.map(el => el.idUsuario).includes(link.idUsuario)) {
        arrayLink.push({ idConta, idUsuario: link.idUsuario, idPerfil: link.idPerfil })
      }
      for (const linked of listLikedAcc) {
        if(linked.idUsuario === link.idUsuario && linked.idPerfil !== link.idPerfil) {
          arrayLink.push({ idConta, idUsuario: link.idUsuario, idPerfil: link.idPerfil })
        }
      }
    }
    await repo.batchLinkUserAccount(arrayLink)
    const arrayDelete: { id: number }[] = []
    for (const linked of listLikedAcc) {
      if (!bind.map(el => el.idUsuario).includes(linked.idUsuario)) {
        arrayDelete.push({ id: linked.id })
      }
      for (const link of bind) {
        if(link.idUsuario === linked.idUsuario && link.idPerfil !== linked.idPerfil) {
          arrayDelete.push({ id: linked.id })
        }
      }
    }
    await repo.batchDeleteLinkedUserAccount(arrayDelete)
  } else {
    const arrayLink: { idConta: number, idUsuario: string, idPerfil: number }[] = []
    for (const el of bind) {
      arrayLink.push({ idConta, idUsuario: el.idUsuario, idPerfil: el.idPerfil })
    }
    await repo.batchLinkUserAccount(arrayLink)
  }
  const acc = await repo.listAccountLinkedUsers({ idConta })
  if(acc.length > 0 || Array.isArray(acc)){
    return acc
  }
  throw new ManageAccountLinkedUsersError()
}
