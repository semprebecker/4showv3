export interface GetValidAdminId {
  getValidAdminId: (
    params: GetValidAdminId.Input
  ) => Promise<GetValidAdminId.Output>;
}
export namespace GetValidAdminId {
  export type Input = {
    idUsuario: string;
  };

  export type Output = { idUsuario: string } | undefined;
}

export interface ListProfiles {
  listProfiles: () => Promise<ListProfiles.Output>;
}
export namespace ListProfiles {
  export type Output = {
    idPerfil: number;
    nome: string;
  }[];
}

export interface ListPermissions {
  listPermissions: () => Promise<ListPermissions.Output>;
}
export namespace ListPermissions {
  export type Output = {
    idPermissao: number;
    nome: string;
  }[];
}

export interface ListPermissionByFilter {
  listPermissionByFilter: (
    params: ListPermissionByFilter.Input
  ) => Promise<ListPermissionByFilter.Output>;
}
export namespace ListPermissionByFilter {
  export type Input = {
    nome: string;
  };

  export type Output = {
    idPermissao: number;
    nome: string;
  }[];
}

export interface AddProfilePermission {
  batchAddProfilePermission: (
    params: AddProfilePermission.Input
  ) => Promise<AddProfilePermission.Output>;
}
export namespace AddProfilePermission {
  export type Input = {
    idPerfil: number;
    idPermissao: number;
  }[];

  export type Output = undefined;
}

export interface ListProfilePermissions {
  listProfilePermissions: (
    params: ListProfilePermissions.Input
  ) => Promise<ListProfilePermissions.Output>;
}
export namespace ListProfilePermissions {
  export type Input = {
    idPerfil: number;
  };

  export type Output = {
    id: number;
    idPerfil: number;
    idPermissao: number;
    dataCadastro: Date;
    dataAlteracao: Date | null;
  }[];
}

export interface DeleteProfilePermissions {
  batchDeleteProfilePermissions: (
    params: DeleteProfilePermissions.Input
  ) => Promise<DeleteProfilePermissions.Output>;
}
export namespace DeleteProfilePermissions {
  export type Input = {
    id: number;
  }[];

  export type Output = undefined;
}

export interface AddAccount {
  addAccount: (params: AddAccount.Input) => Promise<AddAccount.Output>;
}
export namespace AddAccount {
  export type Input = {
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

  export type Output = {
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
}

export interface ValidateSameUrl {
  validateSameUrl: (
    params: ValidateSameUrl.Input
  ) => Promise<ValidateSameUrl.Output>;
}
export namespace ValidateSameUrl {
  export type Input = {
    nomeParamLive: string;
  };

  export type Output =
    | {
        nomeParamLive: string;
      }
    | undefined;
}

export interface UpdateAccount {
  updateAccount: (params: UpdateAccount.Input) => Promise<UpdateAccount.Output>;
}
export namespace UpdateAccount {
  export type Input = {
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

  export type Output = {
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
}

export interface DeleteAccount {
  deleteAccount: (params: DeleteAccount.Input) => Promise<DeleteAccount.Output>;
}
export namespace DeleteAccount {
  export type Input = {
    idConta: number;
  };

  export type Output = undefined | Error;
}

export interface ListAccountsFilter {
  listAccountsByFilter: (
    params: ListAccountsFilter.Input
  ) => Promise<ListAccountsFilter.Output>;
}
export namespace ListAccountsFilter {
  export type Input = {
    searchFor: string;
    pagination: {
      page: number;
      limit: number;
    };
  };

  export type Output = {
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
}

export interface ListAccounts {
  listAccounts: (params: ListAccounts.Input) => Promise<ListAccounts.Output>;
}
export namespace ListAccounts {
  export type Input = {
    pagination: {
      page: number;
      limit: number;
    };
  };

  export type Output = {
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
}

export interface CountAccounts {
  countAccounts: () => Promise<CountAccounts.Output>;
}
export namespace CountAccounts {
  export type Output = {
    count: number;
  };
}

export interface LinkUserAccount {
  batchLinkUserAccount: (
    params: LinkUserAccount.Input
  ) => Promise<LinkUserAccount.Output>;
}
export namespace LinkUserAccount {
  export type Input = {
    idConta: number;
    idUsuario: string;
    idPerfil: number;
  }[];

  export type Output = undefined;
}

export interface ListAccountLinkedUsers {
  listAccountLinkedUsers: (
    params: ListAccountLinkedUsers.Input
  ) => Promise<ListAccountLinkedUsers.Output>;
}
export namespace ListAccountLinkedUsers {
  export type Input = {
    idConta: number;
  };

  export type Output = {
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
}

export interface DeleteLinkedUserAccount {
  batchDeleteLinkedUserAccount: (
    params: DeleteLinkedUserAccount.Input
  ) => Promise<DeleteLinkedUserAccount.Output>;
}
export namespace DeleteLinkedUserAccount {
  export type Input = {
    id: number;
  }[];

  export type Output = undefined;
}

export interface CountUsers {
  countUsers: () => Promise<CountUsers.Output>;
}
export namespace CountUsers {
  export type Output = {
    count: number;
  };
}
