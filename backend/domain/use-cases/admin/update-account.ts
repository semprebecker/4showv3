import { UpdateAccount as Update, ValidateSameUrl } from '../../contracts/repos';
import { UpdateAccountError, CpfCnpjInvalidError, SameUrlNameLiveError, TypePersonInvalidError } from '../../services/errors';
import { generateUrlLive, validateCpfCnpj, validateTypeUser } from '../../services';

type Input = {
  idConta: number,
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
  dataAlteracao: Date,
}

type Setup = (repo: Update & ValidateSameUrl) => UpdateAccount

export type UpdateAccount = (params: Input) => Promise<Output>

export const updateAccount: Setup = (repo) => async params => {
  const { nomeParamLive, cpfCnpj, tipoPessoa } = params
  if(!validateTypeUser(tipoPessoa)) throw new TypePersonInvalidError()
  if(!validateCpfCnpj(cpfCnpj)) throw new CpfCnpjInvalidError()
  const newUrl = generateUrlLive(nomeParamLive)
  const searchEqual = await repo.validateSameUrl({ nomeParamLive: newUrl })
  if(searchEqual && searchEqual.nomeParamLive === newUrl) throw new SameUrlNameLiveError()
  const acc = await repo.updateAccount({ ...params, nomeParamLive: newUrl, showPoweredBy: params.showPoweredBy ?? false  })
  if(acc.dataAlteracao){
    return acc
  }
  throw new UpdateAccountError()
}
