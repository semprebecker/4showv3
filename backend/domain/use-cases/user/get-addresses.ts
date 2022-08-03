import { GetAddresses as Get} from '../../contracts/repos';
import { GetAddressesUserError } from '../../services/errors';

type Input = {
  idUsuario: string,
}

type Output = {
  idEndereco: number;
  tipo: string;
  nome: string;
  logradouro: string;
  numero: number;
  cep: string;
  bairro: string;
  cidade: string;
  complemento: string | null;
  telefone: string;
  selecionado: boolean;
  dataCadastro: Date;
  dataAlteracao: Date | null;
}[]

type Setup = (repo: Get) => GetAddresses

export type GetAddresses = (params: Input) => Promise<Output>

export const getAddresses: Setup = (repo) => async params => {
  const addresses =  await repo.getAddresses({...params })
  if(addresses.length > 0){
    return addresses
  }
  throw new GetAddressesUserError()
}
