import { ListAccountsFilter, ListAccounts as List } from '../../contracts/repos';
import { pagionationHandler } from '../../services';
import { ListAccountsError } from '../../services/errors';

type Input = {
  filter?: {
    nome?: string,
    cpfCnpj?: string,
    email?: string,
    nomeParamLive?: string,
  },
  pagination: {
    page: number,
    limit: number,
  }
}

type Output = {
  idConta: number,
  nome: string,
  email: string,
  tipoPessoa: string,
  cpfCnpj: string,
  telefone: string,
  dataExpiracao: Date,
  nomeParamLive: string,
  porcentagem4Show: number,
  showPoweredBy: boolean,
}[]

type Setup = (repo: ListAccountsFilter & List) => ListAccounts

export type ListAccounts = (params: Input) => Promise<Output>

export const listAccounts: Setup = (repo) => async params => {
  const { filter, pagination } = params
  let searchFor: string = ``
  if(filter && filter.nome){
    searchFor = `nome='${filter.nome}'`
  } else if(filter && filter.email) {
    searchFor = `email='${filter && filter.email}'`
  } else if(filter && filter.cpfCnpj) {
    searchFor = `"cpfCnpj"='${filter.cpfCnpj}'`
  } else if(filter && filter.nomeParamLive) {
    searchFor = `"nomeParamLive"='${filter.nomeParamLive}'`
  }
  const page = pagionationHandler(pagination)
  const accounts = searchFor.length > 0
  ? await repo.listAccountsByFilter({ searchFor, pagination: page })
  : await repo.listAccounts({ pagination: page })
  if(accounts.length > 0 || Array.isArray(accounts)){
    return accounts
  }
  throw new ListAccountsError()
}
