export type AddressEntity = {
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
  selecionado: boolean,
  dataCadastro: Date,
  dataAlteracao: Date | null
};
