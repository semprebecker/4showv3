import { AddAccount as Add, ValidateSameUrl } from '../../contracts/repos';
import { AddAccountError, CpfCnpjInvalidError, SameUrlNameLiveError, TypePersonInvalidError } from '../../services/errors';
import { generateUrlLive, validateCpfCnpj, validateTypeUser } from '../../services';

type Input = {
  nome: string,
  email: string,
  tipoPessoa: string,
  cpfCnpj: string,
  telefone: string,
  dataExpiracao: Date,
  nomeParamLive: string,
  porcentagem4Show: number,
  showPoweredBy?: boolean,
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
  dataCadastro: Date,
  dataAlteracao: Date | null
}

type Setup = (repo: Add & ValidateSameUrl) => AddAccount

export type AddAccount = (params: Input) => Promise<Output>

export const addAccount: Setup = (repo) => async params => {
  const { nomeParamLive, cpfCnpj, tipoPessoa } = params
  if(!validateTypeUser(tipoPessoa)) throw new TypePersonInvalidError()
  if(!validateCpfCnpj(cpfCnpj)) throw new CpfCnpjInvalidError()
  const newUrl = generateUrlLive(nomeParamLive)
  const searchEqual = await repo.validateSameUrl({ nomeParamLive: newUrl })
  if(searchEqual && searchEqual.nomeParamLive === newUrl) throw new SameUrlNameLiveError()
  const acc = await repo.addAccount({ ...params, nomeParamLive: newUrl, showPoweredBy: params.showPoweredBy ?? false  })
  if(acc.dataCadastro){
    return acc
  }
  throw new AddAccountError()
}
