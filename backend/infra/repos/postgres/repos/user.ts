import { PgRepository } from ".";
import { UserEntity, UserAccountEntity, AddressEntity } from "../entities";
import { ProfileEnum, typeUser } from "../helpers";
import {
  InputAdd,
  OutputAdd,
  InputUpdate,
  OutputUpdate,
  InputGet,
  OutputGet,
  InputValidUserId,
  OutputValidUserId,
  InputAddAddress,
  OutputAddAddress,
  InputGetUserAccount,
  OutputGetUserAccount,
  InputUpdateAddress,
  OutputUpdateAddress,
  InputGetAddresses,
  OutputGetAddresses,
} from "../types/user";

export class PgUserRepository extends PgRepository {
  async addUserClient({
    idUsuario,
    nome,
    email,
    telefone,
    cpfCnpj,
    tipoPessoa,
  }: InputAdd): Promise<OutputAdd> {
    const userEnable = true;
    const insert = `INSERT INTO public."USUARIOS"
      ("idUsuario", nome, email, "idPerfil", "tipoPessoa", "cpfCnpj", telefone, ativo)
      VALUES ('${idUsuario}', '${nome}', '${email}', ${
      ProfileEnum.cliente
    }, '${tipoPessoa
      .substring(0, 2)
      .toLocaleLowerCase()}', '${cpfCnpj}', '${telefone}', ${userEnable})
      RETURNING "idUsuario";`;
    const pgUserRepo: UserEntity[] = await this.perform(insert);
    return { idUsuario: pgUserRepo[0].idUsuario! };
  }

  async updateUser({
    idUsuario,
    nome,
    email,
    telefone,
    cpfCnpj,
    tipoPessoa,
  }: InputUpdate): Promise<OutputUpdate> {
    const update = `UPDATE public."USUARIOS"
      SET nome='${nome}', email='${email}', "tipoPessoa"='${tipoPessoa
      .substring(0, 2)
      .toLocaleLowerCase()}', "cpfCnpj"='${cpfCnpj}', telefone='${telefone}', "dataAlteracao"=CURRENT_TIMESTAMP
      WHERE "idUsuario" = '${idUsuario}'
      RETURNING nome, email, "idPerfil", "tipoPessoa", "cpfCnpj", telefone, ativo;`;
    const pgUserRepo: UserEntity[] = await this.perform(update);
    return {
      ...pgUserRepo[0],
      nomePerfil: ProfileEnum[pgUserRepo[0].idPerfil],
      tipoPessoa: typeUser(pgUserRepo[0].tipoPessoa) as string,
    };
  }

  async getUser({ idUsuario }: InputGet): Promise<OutputGet> {
    const select = `SELECT nome, email, "idPerfil", "tipoPessoa", "cpfCnpj", telefone, ativo FROM public."USUARIOS" WHERE "idUsuario" = '${idUsuario}';`;
    const pgUserRepo: UserEntity[] = await this.perform(select);
    if (pgUserRepo.length > 0 && pgUserRepo[0]) {
      return {
        ...pgUserRepo[0],
        nomePerfil: ProfileEnum[pgUserRepo[0].idPerfil],
        tipoPessoa: typeUser(pgUserRepo[0].tipoPessoa) as string,
      };
    } else {
      return undefined;
    }
  }

  async getValidUserId({
    idUsuario,
  }: InputValidUserId): Promise<OutputValidUserId> {
    const userEnable = true;
    const select = `SELECT "idUsuario" FROM public."USUARIOS" WHERE "idUsuario" = '${idUsuario}' AND ativo = ${userEnable};`;
    const pgUserRepo: UserEntity[] = await this.perform(select);
    return { idUsuario: pgUserRepo[0].idUsuario };
  }

  async getUserAccount({
    idUsuario,
  }: InputGetUserAccount): Promise<OutputGetUserAccount> {
    const select = `SELECT * FROM public."USUARIOSCONTAS" WHERE "idUsuario" = '${idUsuario}';`;
    const pgUserRepo: UserAccountEntity[] = await this.perform(select);
    if (pgUserRepo.length && pgUserRepo[0].idPerfil)
      return { nomePerfil: ProfileEnum[pgUserRepo[0].idPerfil] };
    else return undefined;
  }

  async addAddress({
    idUsuario,
    tipo,
    nome,
    logradouro,
    numero,
    cep,
    bairro,
    cidade,
    complemento,
    telefone,
    selecionado,
  }: InputAddAddress): Promise<OutputAddAddress> {
    const select = `INSERT INTO public."ENDERECOS"
    ("idUsuario", tipo, nome, logradouro, numero, cep, bairro, cidade, complemento, telefone, selecionado)
    VALUES ('${idUsuario}', '${tipo}', '${nome}', '${logradouro}', ${numero}, '${cep}', '${bairro}', '${cidade}', '${complemento}', '${telefone}', ${selecionado})
    RETURNING "idEndereco", "tipo", "selecionado", "dataCadastro";`;
    const pgUserRepo: AddressEntity[] = await this.perform(select);
    return {
      idEndereco: pgUserRepo[0].idEndereco,
      tipo: pgUserRepo[0].tipo,
      selecionado: pgUserRepo[0].selecionado,
      dataCadastro: pgUserRepo[0].dataCadastro,
    };
  }

  async updateAddress({
    idUsuario,
    idEndereco,
    nome,
    logradouro,
    numero,
    cep,
    bairro,
    cidade,
    complemento,
    telefone,
    selecionado,
  }: InputUpdateAddress): Promise<OutputUpdateAddress> {
    const update = `UPDATE public."ENDERECOS"
      SET nome='${nome}', logradouro='${logradouro}', numero=${numero}, cep='${cep}', bairro='${bairro}', cidade='${cidade}', complemento='${complemento}', telefone='${telefone}', selecionado=${selecionado}, "dataAlteracao"=CURRENT_TIMESTAMP
      WHERE "idEndereco" = ${idEndereco} AND "idUsuario" = '${idUsuario}'
      RETURNING *;`;
    const pgUserRepo: AddressEntity[] = await this.perform(update);
    return { ...pgUserRepo[0] };
  }

  async getAddresses({
    idUsuario,
  }: InputGetAddresses): Promise<OutputGetAddresses> {
    const select = `SELECT "idEndereco", tipo, nome, logradouro, numero, cep, bairro, cidade, complemento, telefone, selecionado, "dataCadastro", "dataAlteracao" FROM public."ENDERECOS" WHERE "idUsuario" = '${idUsuario}' ORDER BY "dataCadastro";`;
    const pgUserRepo: AddressEntity[] = await this.perform(select);
    return pgUserRepo;
  }
}
