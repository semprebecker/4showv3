export interface AddUser {
  addUserClient: (params: AddUser.Input) => Promise<AddUser.Output>;
}
export namespace AddUser {
  export type Input = {
    idUsuario: string;
    nome: string;
    email: string;
    tipoPessoa: string;
    cpfCnpj: string | null;
    telefone: string;
  };

  export type Output = { idUsuario: string };
}

export interface UpdateUser {
  updateUser: (params: UpdateUser.Input) => Promise<UpdateUser.Output>;
}
export namespace UpdateUser {
  export type Input = {
    idUsuario: string;
    nome: string;
    email: string;
    tipoPessoa: string;
    cpfCnpj: string | null;
    telefone: string;
  };

  export type Output = {
    nome: string;
    email: string;
    idPerfil: number;
    nomePerfil: string;
    tipoPessoa: string;
    cpfCnpj: string | null;
    telefone: string;
    ativo: boolean;
  };
}

export interface GetValidUserId {
  getValidUserId: (
    params: GetValidUserId.Input
  ) => Promise<GetValidUserId.Output>;
}
export namespace GetValidUserId {
  export type Input = {
    idUsuario: string;
  };

  export type Output = { idUsuario: string } | undefined;
}

export interface GetUser {
  getUser: (params: GetUser.Input) => Promise<GetUser.Output>;
}
export namespace GetUser {
  export type Input = {
    idUsuario: string;
  };

  export type Output =
    | {
        nome: string;
        email: string;
        idPerfil: number;
        nomePerfil: string;
        tipoPessoa: string;
        cpfCnpj: string | null;
        telefone: string;
        ativo: boolean;
      }
    | undefined;
}

export interface AddAddress {
  addAddress: (params: AddAddress.Input) => Promise<AddAddress.Output>;
}

export namespace AddAddress {
  export type Input = {
    idUsuario: string;
    tipo: string;
    nome: string;
    logradouro: string;
    numero: number;
    cep: string;
    bairro: string;
    cidade: string;
    complemento: string | null;
    telefone: string;
    selecionado: boolean | null;
  };

  export type Output = {
    idEndereco: number;
    tipo: string;
    selecionado: boolean;
    dataCadastro: Date;
  };
}

export interface GetUserAccount {
  getUserAccount: (
    params: GetUserAccount.Input
  ) => Promise<GetUserAccount.Output>;
}

export namespace GetUserAccount {
  export type Input = {
    idUsuario: string;
  };

  export type Output =
    | {
        nomePerfil: string;
      }
    | undefined;
}

export interface UpdateAddress {
  updateAddress: (params: UpdateAddress.Input) => Promise<UpdateAddress.Output>;
}

export namespace UpdateAddress {
  export type Input = {
    idEndereco: number;
    idUsuario: string;
    nome: string;
    logradouro: string;
    numero: number;
    cep: string;
    bairro: string;
    cidade: string;
    complemento: string | null;
    telefone: string;
    selecionado: boolean;
  };

  export type Output = {
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
    dataAlteracao: Date;
  };
}

export interface GetAddresses {
  getAddresses: (params: GetAddresses.Input) => Promise<GetAddresses.Output>;
}
export namespace GetAddresses {
  export type Input = {
    idUsuario: string;
  };

  export type Output = {
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
  }[];
}
