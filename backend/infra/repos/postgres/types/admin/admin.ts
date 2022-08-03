export type InputValidAdminId = { idUsuario: string };
export type OutputValidAdminId = { idUsuario: string };

export type OutputListProfiles = { idPerfil: number; nome: string }[];

export type OutputListPermissions = { idPermissao: number; nome: string }[];

export type InputListPermission = { nome: string };
export type OutputListPermissionByFilter = {
  idPermissao: number;
  nome: string;
}[];

export type InputAddProfilePermission = {
  idPerfil: number;
  idPermissao: number;
}[];
export type OutputAddProfilePermission = undefined;

export type InputListProfilePermissions = { idPerfil: number };
export type OutputListProfilePermissions = {
  id: number;
  idPerfil: number;
  idPermissao: number;
  dataCadastro: Date;
  dataAlteracao: Date | null;
}[];

export type InputDeleteProfilePermission = { id: number }[];
export type OutputDeleteProfilePermission = undefined;

export type InputAddAccount = {
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
export type OutputAddAccount = {
  idConta: number;
  nome: string;
  email: string;
  tipoPessoa: string;
  cpfCnpj: string;
  telefone: string;
  dataExpiracao: Date;
  nomeParamLive: string;
  porcentagem4Show: number;
  showPoweredBy: boolean;
  dataCadastro: Date;
  dataAlteracao: Date | null;
};

export type InputValidateSameUrl = { nomeParamLive: string };
export type OutputValidateSameUrl = { nomeParamLive: string } | undefined;

export type InputUpdateAccount = {
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
export type OutputUpdateAccount = {
  idConta: number;
  nome: string;
  email: string;
  tipoPessoa: string;
  cpfCnpj: string;
  telefone: string;
  dataExpiracao: Date;
  nomeParamLive: string;
  porcentagem4Show: number;
  showPoweredBy: boolean;
  dataCadastro: Date;
  dataAlteracao: Date;
};

export type InputDeleteAccount = { idConta: number };
export type OutputDeleteAccount = undefined;

export type InputListAccountsByFilter = {
  searchFor: string;
  pagination: { page: number; limit: number };
};
export type OutputListAccountsByFilter = {
  idConta: number;
  nome: string;
  email: string;
  tipoPessoa: string;
  cpfCnpj: string;
  telefone: string;
  dataExpiracao: Date;
  nomeParamLive: string;
  porcentagem4Show: number;
  showPoweredBy: boolean;
}[];

export type InputListAccounts = { pagination: { page: number; limit: number } };
export type OutputListAccounts = {
  idConta: number;
  nome: string;
  email: string;
  tipoPessoa: string;
  cpfCnpj: string;
  telefone: string;
  dataExpiracao: Date;
  nomeParamLive: string;
  porcentagem4Show: number;
  showPoweredBy: boolean;
}[];

export type OutputCountPagesAccounts = { count: number };

export type InputLinkUserAccount = {
  idConta: number;
  idUsuario: string;
  idPerfil: number;
}[];
export type OutputLinkUserAccount = undefined;

export type InputListAccountLinkedUsers = { idConta: number };
export type OutputListAccountLinkedUsers = {
  id: number;
  idConta: number;
  idUsuario: string;
  nome: string;
  email: string;
  tipoPessoa: string;
  cpfCnpj: string | null;
  telefone: string;
  ativo: boolean;
  idPerfil: number;
  nomePerfil: string;
  tipo: string;
}[];

export type InputDeleteLinkedUserAccount = { id: number }[];
export type OutputDeleteLinkedUserAccount = undefined;

export type OutputCountPagesUsers = { count: number };
