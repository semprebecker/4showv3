export type AccountEntity = {
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
};

