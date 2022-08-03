import { AddAddress, GetUserAccount } from '../../contracts/repos';
import { AddAddressUserError, ZipCodeInvalidError } from '../../services/errors';
import { validateZipCode } from '../../services/validate-zip-code';

type Input = {
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
  idUsuario: string,
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
}

type Setup = (repo: AddAddress & GetUserAccount) => AddAddressUser

export type AddAddressUser = (params: Input) => Promise<Output>

export const addAddress: Setup = (repo) => async params => {
  const { idUsuario, nome, logradouro, numero, cep, cidade, bairro, complemento, telefone } = params
  if(!validateZipCode(cep)) throw new ZipCodeInvalidError()
  let tipo = 'E'
  let selecionado = params.selecionado ? true : false;
  let complt = complemento ? complemento : ''
  const userAccount = await repo.getUserAccount({ idUsuario })
  if(userAccount !== undefined && userAccount.nomePerfil === 'contratante') tipo = 'O'
  const address =  await repo.addAddress({...params, tipo, selecionado, complemento: complt })
  if(address.dataCadastro){
    return {...address, idUsuario, nome, logradouro, numero, cep, cidade, bairro, complemento, telefone }
  }
  throw new AddAddressUserError()
}
