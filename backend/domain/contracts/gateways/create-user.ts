export interface CreateUser {
  createUserClient: (params: CreateUser.Input) => Promise<CreateUser.Output>
}

export namespace CreateUser {
  export type Input = {
    email: string;
  }

  export type Output = { idUsuario: string } | undefined | string;
}

