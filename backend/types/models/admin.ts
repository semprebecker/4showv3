export type ListPermissionsAdmin = {
  nome?: string
};

export type ManageProfilePermissionsAdmin = {
  idPerfil: number,
  permissionsId: number[]
};

export type AddAccountAdmin = {
  nome: string;
  email: string;
  tipoPessoa: string;
  cpfCnpj: string;
  telefone: string;
  dataExpiracao: Date;
  nomeParamLive: string;
  porcentagem4Show: number;
  showPoweredBy?: boolean;
};

export type UpdateAccountAdmin = {
  idConta: number;
  nome: string;
  email: string;
  tipoPessoa: string;
  cpfCnpj: string;
  telefone: string;
  dataExpiracao: Date;
  nomeParamLive: string;
  porcentagem4Show: number;
  showPoweredBy?: boolean;
};

export type ListAccountsAdmin = {
  nome?: string;
  cpfCnpj?: string;
  email?: string;
  nomeParamLive?: string;
};

export type PagionationModel = {
  page: number;
  limit: number;
};

export type ManageAccountLinkedUserAdmin = {
  idConta: number,
  bind: {
    idUsuario: string,
    idPerfil: number
  }[]
};

