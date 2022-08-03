import { PgRepository } from ".";
import {
  UserEntity,
  ProfileEntity,
  ProfileXPermissionsEntity,
  AccountEntity,
  UserAccountEntity,
} from "../entities";
import { PermissionEntity } from "../entities/permissions";
import { ProfileEnum, typeUser } from "../helpers";
import {
  InputValidAdminId,
  OutputValidAdminId,
  OutputListProfiles,
  OutputListPermissions,
  InputListPermission,
  OutputListPermissionByFilter,
  InputAddProfilePermission,
  OutputAddProfilePermission,
  InputListProfilePermissions,
  OutputListProfilePermissions,
  InputDeleteProfilePermission,
  OutputDeleteProfilePermission,
  InputAddAccount,
  OutputAddAccount,
  InputValidateSameUrl,
  OutputValidateSameUrl,
  InputUpdateAccount,
  OutputUpdateAccount,
  InputDeleteAccount,
  OutputDeleteAccount,
  InputListAccounts,
  OutputListAccounts,
  InputListAccountsByFilter,
  OutputCountPagesAccounts,
  OutputListAccountsByFilter,
  InputLinkUserAccount,
  OutputLinkUserAccount,
  InputListAccountLinkedUsers,
  OutputListAccountLinkedUsers,
  InputDeleteLinkedUserAccount,
  OutputDeleteLinkedUserAccount,
  OutputCountPagesUsers,
} from "../types/admin";

export class PgAdminRepository extends PgRepository {
  async getValidAdminId({
    idUsuario,
  }: InputValidAdminId): Promise<OutputValidAdminId> {
    const userEnable = true;
    const select = `SELECT "idUsuario" FROM public."USUARIOS" WHERE "idUsuario" = '${idUsuario}' AND "idPerfil" = ${ProfileEnum.admin} AND ativo = ${userEnable};`;
    const pgAdminRepo: UserEntity[] = await this.perform(select);
    return { idUsuario: pgAdminRepo[0].idUsuario };
  }

  async listProfiles(): Promise<OutputListProfiles> {
    const select = `SELECT "idPerfil", nome FROM public."PERFIS" WHERE "idPerfil" NOT IN (${ProfileEnum.admin}, ${ProfileEnum.cliente});`;
    const pgAdminRepo: ProfileEntity[] = await this.perform(select);
    return pgAdminRepo;
  }

  async listPermissions(): Promise<OutputListPermissions> {
    const select = `SELECT "idPermissao", nome FROM public."PERMISSOES" ORDER BY nome;`;
    const pgAdminRepo: PermissionEntity[] = await this.perform(select);
    return pgAdminRepo;
  }

  async listPermissionByFilter({
    nome,
  }: InputListPermission): Promise<OutputListPermissionByFilter> {
    const select = `SELECT "idPermissao", nome FROM public."PERMISSOES" WHERE nome = '${nome}';`;
    const pgAdminRepo: PermissionEntity[] = await this.perform(select);
    return pgAdminRepo;
  }

  async listProfilePermissions({
    idPerfil,
  }: InputListProfilePermissions): Promise<OutputListProfilePermissions> {
    const select = `SELECT * FROM public."PERFILXPERMISSOES" WHERE "idPerfil" = ${idPerfil} ORDER BY id;`;
    const pgAdminRepo: ProfileXPermissionsEntity[] = await this.perform(select);
    return pgAdminRepo;
  }

  async batchAddProfilePermission(
    array: InputAddProfilePermission
  ): Promise<OutputAddProfilePermission> {
    const insert = `INSERT INTO public."PERFILXPERMISSOES" ("idPerfil", "idPermissao", "dataCadastro")
      VALUES (:idPerfil, :idPermissao, CURRENT_TIMESTAMP);`;
    await this.perform(insert, array);
    return undefined;
  }

  async batchDeleteProfilePermissions(
    array: InputDeleteProfilePermission
  ): Promise<OutputDeleteProfilePermission> {
    const deleteSQL = `DELETE FROM public."PERFILXPERMISSOES" WHERE id = :id;`;
    await this.perform(deleteSQL, array);
    return undefined;
  }

  async addAccount({
    nome,
    email,
    cpfCnpj,
    nomeParamLive,
    tipoPessoa,
    telefone,
    dataExpiracao,
    porcentagem4Show,
    showPoweredBy,
  }: InputAddAccount): Promise<OutputAddAccount> {
    const insert = `INSERT INTO public."CONTAS"
    (nome, email, "cpfCnpj", "tipoPessoa", telefone, "dataExpiracao", "nomeParamLive", "porcentagem4Show", "showPoweredBy") VALUES
    ('${nome}', '${email}', '${cpfCnpj}', '${tipoPessoa
      .substring(0, 2)
      .toLocaleLowerCase()}', '${telefone}', '${dataExpiracao}', '${nomeParamLive}', ${porcentagem4Show}, ${showPoweredBy})
    RETURNING *;`;
    const pgAdminRepo: AccountEntity[] = await this.perform(insert);
    return {
      ...pgAdminRepo[0],
      tipoPessoa: typeUser(pgAdminRepo[0].tipoPessoa) as string,
    };
  }

  async validateSameUrl({
    nomeParamLive,
  }: InputValidateSameUrl): Promise<OutputValidateSameUrl> {
    const insert = `SELECT "nomeParamLive" FROM public."CONTAS" WHERE "nomeParamLive" = '${nomeParamLive}';`;
    const pgAdminRepo: AccountEntity[] = await this.perform(insert);
    if (pgAdminRepo.length > 0 && pgAdminRepo[0]) {
      return pgAdminRepo[0];
    } else {
      return undefined;
    }
  }

  async updateAccount({
    idConta,
    nome,
    email,
    cpfCnpj,
    nomeParamLive,
    tipoPessoa,
    telefone,
    dataExpiracao,
    porcentagem4Show,
    showPoweredBy,
  }: InputUpdateAccount): Promise<OutputUpdateAccount> {
    const update = `UPDATE public."CONTAS" SET
    nome='${nome}', email='${email}', "cpfCnpj"='${cpfCnpj}', "tipoPessoa"='${tipoPessoa
      .substring(0, 2)
      .toLocaleLowerCase()}', telefone='${telefone}', "dataExpiracao"='${dataExpiracao}', "nomeParamLive"='${nomeParamLive}', "porcentagem4Show"=${porcentagem4Show}, "showPoweredBy"=${showPoweredBy}, "dataAlteracao"=CURRENT_TIMESTAMP
    WHERE "idConta"=${idConta} RETURNING *;`;
    const pgAdminRepo: AccountEntity[] = await this.perform(update);
    return {
      ...pgAdminRepo[0],
      tipoPessoa: typeUser(pgAdminRepo[0].tipoPessoa) as string,
      dataAlteracao: pgAdminRepo[0].dataAlteracao!,
    };
  }

  async deleteAccount({
    idConta,
  }: InputDeleteAccount): Promise<OutputDeleteAccount> {
    const update = `DELETE FROM public."CONTAS" WHERE "idConta"=${idConta};`;
    const pgAdminRepo: AccountEntity[] = await this.perform(update);
    return undefined;
  }

  async listAccountsByFilter({
    searchFor,
    pagination: { page, limit },
  }: InputListAccountsByFilter): Promise<OutputListAccountsByFilter> {
    const insert = `SELECT nome, email, "cpfCnpj", "tipoPessoa", telefone, "dataExpiracao", "nomeParamLive", "porcentagem4Show", "showPoweredBy" FROM public."CONTAS"
    WHERE ${searchFor} ORDER BY nome LIMIT ${limit} OFFSET ${page};`;
    const pgAdminRepo: AccountEntity[] = await this.perform(insert);
    if (pgAdminRepo.length > 0 && pgAdminRepo[0]) {
      return typeUser(pgAdminRepo) as OutputListAccounts;
    } else {
      return [];
    }
  }

  async listAccounts({
    pagination: { page, limit },
  }: InputListAccounts): Promise<OutputListAccounts> {
    const insert = `SELECT nome, email, "cpfCnpj", "tipoPessoa", telefone, "dataExpiracao", "nomeParamLive", "porcentagem4Show", "showPoweredBy" FROM public."CONTAS"
    ORDER BY nome LIMIT ${limit} OFFSET ${page};`;
    const pgAdminRepo: AccountEntity[] = await this.perform(insert);
    if (pgAdminRepo.length > 0 && pgAdminRepo[0]) {
      return typeUser(pgAdminRepo) as OutputListAccounts;
    } else {
      return [];
    }
  }

  async countAccounts(): Promise<OutputCountPagesAccounts> {
    const select = `SELECT COUNT(*) FROM public."CONTAS";`;
    const count = await this.perform(select);
    return count[0];
  }

  async batchLinkUserAccount(
    array: InputLinkUserAccount
  ): Promise<OutputLinkUserAccount> {
    const insert = `INSERT INTO public."USUARIOSCONTAS" ("idConta", "idUsuario", "idPerfil", "dataCadastro")
      VALUES (:idConta, :idUsuario, :idPerfil, CURRENT_TIMESTAMP);`;
    await this.perform(insert, array);
    return undefined;
  }

  async listAccountLinkedUsers({
    idConta,
  }: InputListAccountLinkedUsers): Promise<OutputListAccountLinkedUsers> {
    const select = `SELECT c.id, c."idConta", u."idUsuario", u.nome, u.email, u."tipoPessoa", u."cpfCnpj", u.telefone, u.ativo, c."idPerfil", p."nome" as "nomePerfil", p."tipo"
      FROM public."USUARIOSCONTAS" c
      INNER JOIN public."USUARIOS" u ON u."idUsuario" = c."idUsuario"
      INNER JOIN public."PERFIS" p ON p."idPerfil" = c."idPerfil"
      WHERE c."idConta" = ${idConta}
      ORDER BY c.id;`;
    const pgAdminRepo: UserAccountEntity[] = await this.perform(select);
    if (pgAdminRepo.length > 0 && pgAdminRepo[0]) {
      return typeUser(pgAdminRepo) as OutputListAccountLinkedUsers;
    } else {
      return [];
    }
  }

  async batchDeleteLinkedUserAccount(
    array: InputDeleteLinkedUserAccount
  ): Promise<OutputDeleteLinkedUserAccount> {
    const deleteSQL = `DELETE FROM public."USUARIOSCONTAS" WHERE id = :id;`;
    await this.perform(deleteSQL, array);
    return undefined;
  }

  async countUsers(): Promise<OutputCountPagesUsers> {
    const select = `SELECT COUNT(*) FROM public."USUARIOS";`;
    const count = await this.perform(select);
    return count[0];
  }
}
