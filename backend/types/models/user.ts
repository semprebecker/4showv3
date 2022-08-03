export type AddUser = {
  nome: string;
  email: string;
  tipoPessoa: string;
  cpfCnpj: string | null;
  telefone: string;
};

export type UpdateUser = {
  nome: string,
  email: string,
  tipoPessoa: string,
  cpfCnpj: string | null,
  telefone: string
};

export type AddAddressUser = {
  nome: string,
  logradouro: string,
  numero: number,
  cep: string,
  bairro: string,
  cidade: string,
  complemento: string | null,
  telefone: string,
  selecionado: boolean | null,
};

export type UpdateAddressUser = {
  idEndereco: number,
  nome: string,
  logradouro: string,
  numero: number,
  cep: string,
  bairro: string,
  cidade: string,
  complemento: string | null,
  telefone: string,
  selecionado: boolean | null,
};
