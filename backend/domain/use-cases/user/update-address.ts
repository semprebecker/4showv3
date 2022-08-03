import { UpdateAddress } from '../../contracts/repos';
import { validateZipCode } from '../../services';
import { UpdateAddressUserError, ZipCodeInvalidError } from '../../services/errors';

type Input = {
  idEndereco: number,
  idUsuario: string,
  nome: string,
  logradouro: string,
  numero: number,
  cep: string,
  bairro: string,
  cidade: string,
  complemento: string | null,
  telefone: string,
  selecionado: boolean | null
}

type Output = {
  idEndereco: number,
  tipo: string,
  nome: string,
  logradouro: string,
  numero: number,
  cep: string,
  bairro: string,
  cidade: string,
  complemento: string | null,
  telefone: string,
  selecionado: boolean
  dataCadastro: Date;
  dataAlteracao: Date;
}

type Setup = (repo: UpdateAddress) => UpdateAddressUser

export type UpdateAddressUser = (params: Input) => Promise<Output>

export const updateAddress: Setup = (repo) => async params => {
  const { cep } = params
  if(!validateZipCode(cep)) throw new ZipCodeInvalidError()
  let selecionado = params.selecionado ? true : false;
  let complt = params.complemento ? params.complemento : ''
  const address =  await repo.updateAddress({...params, selecionado, complemento: complt })
  if(address.dataAlteracao){
    return {...address }
  }
  throw new UpdateAddressUserError()
}
