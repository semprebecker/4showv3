export type UserEntity = {
  idUsuario: string;
  nome: string;
  email: string;
  idPerfil: number;
  tipoPessoa: string;
  cpfCnpj: string | null;
  telefone: string;
  ativo: boolean;
  dataCadastro: Date;
  dataAlteracao: Date | null;
};

