import { WebSocketApi } from "@aws-cdk/aws-apigatewayv2-alpha";
import { Stack } from "aws-cdk-lib";
import { JsonSchema, JsonSchemaType } from "aws-cdk-lib/aws-apigateway";
import { CfnModel } from "aws-cdk-lib/aws-apigatewayv2";

import { MessageAction } from "../backend/types";

// Create `CfnModel` from properties.
const getModel = (
  scope: Stack,
  modelName: string,
  properties: {
    [name: string]: JsonSchema;
  },
  required: string[],
  webSocketApi: WebSocketApi
) => {
  return new CfnModel(scope, `${modelName}Model`, {
    apiId: webSocketApi.apiId,
    contentType: "application/json",
    name: `${modelName}Model`,
    schema: {
      $schema: "http://json-schema.org/draft-04/schema#",
      properties,
      required,
      title: `${modelName}Schema`,
      type: "object",
    },
  });
};

// Create models for validation. It's possible to generate models from TypeScript interfaces or types.
// See https://matt.martz.codes/how-to-automatically-generate-request-models-from-typescript-interfaces for some inspiration.
export const getModels = (
  scope: Stack,
  webSocketApi: WebSocketApi
): { [key: string]: CfnModel } => {
  // Was unable to get $ref to work which is the preferred JsonSchema way to do this.
  // Saved here by imperative code that will duplicate this nested model in our Cfn.
  // Should work and does in RestAPI, but haven't gotten this to work in V2 spec
  // https://docs.aws.amazon.com/apigateway/latest/developerguide/models-mappings.html

  const addUserModel = {
    properties: {
      nome: { type: JsonSchemaType.STRING },
      email: { type: JsonSchemaType.STRING },
      tipoPessoa: { type: JsonSchemaType.STRING },
      cfpCnpj: { type: JsonSchemaType.STRING },
      telefone: { type: JsonSchemaType.STRING },
    },
    required: ["nome", "email", "tipoPessoa", "telefone"],
    type: JsonSchemaType.OBJECT,
  };

  const updateUserModel = {
    properties: {
      nome: { type: JsonSchemaType.STRING },
      email: { type: JsonSchemaType.STRING },
      tipoPessoa: { type: JsonSchemaType.STRING },
      cfpCnpj: { type: JsonSchemaType.STRING },
      telefone: { type: JsonSchemaType.STRING },
    },
    required: ["nome", "email", "tipoPessoa", "telefone"],
    type: JsonSchemaType.OBJECT,
  };

  const addAddressUserModel = {
    properties: {
      nome: { type: JsonSchemaType.STRING },
      logradouro: { type: JsonSchemaType.STRING },
      numero: { type: JsonSchemaType.NUMBER },
      cep: { type: JsonSchemaType.STRING },
      bairro: { type: JsonSchemaType.STRING },
      cidade: { type: JsonSchemaType.STRING },
      complemento: { type: JsonSchemaType.STRING },
      telefone: { type: JsonSchemaType.STRING },
      selecionado: { type: JsonSchemaType.BOOLEAN },
    },
    required: [
      "nome",
      "logradouro",
      "numero",
      "cep",
      "bairro",
      "cidade",
      "telefone",
    ],
    type: JsonSchemaType.OBJECT,
  };

  const updateAddressUserModel = {
    properties: {
      idEndereco: { type: JsonSchemaType.NUMBER },
      nome: { type: JsonSchemaType.STRING },
      logradouro: { type: JsonSchemaType.STRING },
      numero: { type: JsonSchemaType.NUMBER },
      cep: { type: JsonSchemaType.STRING },
      bairro: { type: JsonSchemaType.STRING },
      cidade: { type: JsonSchemaType.STRING },
      complemento: { type: JsonSchemaType.STRING },
      telefone: { type: JsonSchemaType.STRING },
      selecionado: { type: JsonSchemaType.BOOLEAN },
    },
    required: [
      "idEndereco",
      "nome",
      "logradouro",
      "numero",
      "cep",
      "bairro",
      "cidade",
      "telefone",
    ],
    type: JsonSchemaType.OBJECT,
  };

  const filterListPermissionsModel = {
    properties: {
      nome: { type: JsonSchemaType.STRING },
    },
    type: JsonSchemaType.OBJECT,
  };

  const manageProfilePermissionsModel = {
    properties: {
      idPerfil: { type: JsonSchemaType.NUMBER },
      permissionsId: { type: JsonSchemaType.ARRAY },
    },
    required: ["idPerfil", "permissionsId"],
    type: JsonSchemaType.OBJECT,
  };

  const accountModel = {
    properties: {
      nome: { type: JsonSchemaType.STRING },
      email: { type: JsonSchemaType.STRING },
      tipoPessoa: { type: JsonSchemaType.STRING },
      cfpCnpj: { type: JsonSchemaType.STRING },
      telefone: { type: JsonSchemaType.STRING },
      dataExpiracao: { type: JsonSchemaType.STRING },
      nomeParamLive: { type: JsonSchemaType.STRING },
      porcentagem4Show: { type: JsonSchemaType.NUMBER },
      showPoweredBy: { type: JsonSchemaType.BOOLEAN },
    },
    required: [
      "nome",
      "email",
      "tipoPessoa",
      "cfpCnpj",
      "telefone",
      "dataExpiracao",
      "nomeParamLive",
      "porcentagem4Show",
    ],
    type: JsonSchemaType.OBJECT,
  };

  const updateAccountModel = {
    properties: {
      idConta: { type: JsonSchemaType.NUMBER },
      nome: { type: JsonSchemaType.STRING },
      email: { type: JsonSchemaType.STRING },
      tipoPessoa: { type: JsonSchemaType.STRING },
      cfpCnpj: { type: JsonSchemaType.STRING },
      telefone: { type: JsonSchemaType.STRING },
      dataExpiracao: { type: JsonSchemaType.STRING },
      nomeParamLive: { type: JsonSchemaType.STRING },
      porcentagem4Show: { type: JsonSchemaType.NUMBER },
      showPoweredBy: { type: JsonSchemaType.BOOLEAN },
    },
    required: [
      "idConta",
      "nome",
      "email",
      "tipoPessoa",
      "cfpCnpj",
      "telefone",
      "dataExpiracao",
      "nomeParamLive",
      "porcentagem4Show",
    ],
    type: JsonSchemaType.OBJECT,
  };

  const listAccountsModel = {
    properties: {
      nome: { type: JsonSchemaType.STRING },
      email: { type: JsonSchemaType.STRING },
      cfpCnpj: { type: JsonSchemaType.STRING },
      nomeParamLive: { type: JsonSchemaType.STRING },
    },
    type: JsonSchemaType.OBJECT,
  };

  const paginationModel = {
    properties: {
      page: { type: JsonSchemaType.NUMBER },
      limit: { type: JsonSchemaType.NUMBER },
    },
    required: ["page", "limit"],
    type: JsonSchemaType.OBJECT,
  };

  const manageAccountLinkedUsersModel = {
    properties: {
      idConta: { type: JsonSchemaType.NUMBER },
      bind: { type: JsonSchemaType.ARRAY },
    },
    required: ["idConta", "bind"],
    type: JsonSchemaType.OBJECT,
  };

  const getStateModel = getModel(
    scope,
    "GetState",
    { action: { enum: [MessageAction.GET_STATE] } },
    ["action"],
    webSocketApi
  );

  const addUser = getModel(
    scope,
    "addUserModel",
    { action: { enum: [MessageAction.ADD_USER] }, user: addUserModel },
    ["action", "user"],
    webSocketApi
  );

  const updateUser = getModel(
    scope,
    "updateUserModel",
    { action: { enum: [MessageAction.UPDATE_USER] }, user: updateUserModel },
    ["action", "user"],
    webSocketApi
  );

  const getUser = getModel(
    scope,
    "getUserModel",
    { action: { enum: [MessageAction.GET_USER] } },
    ["action"],
    webSocketApi
  );

  const addAddressUser = getModel(
    scope,
    "addAddressUserModel",
    {
      action: { enum: [MessageAction.ADD_ADDRESS_USER] },
      address: addAddressUserModel,
    },
    ["action", "address"],
    webSocketApi
  );

  const updateAddressUser = getModel(
    scope,
    "updateAddressUserModel",
    {
      action: { enum: [MessageAction.UPDATE_ADDRESS_USER] },
      address: updateAddressUserModel,
    },
    ["action", "address"],
    webSocketApi
  );

  const getAddressesUser = getModel(
    scope,
    "getAddressesUserModel",
    { action: { enum: [MessageAction.GET_ADDRESSES_USER] } },
    ["action"],
    webSocketApi
  );

  const listProfilesAdmin = getModel(
    scope,
    "listProfilesAdminModel",
    { action: { enum: [MessageAction.LIST_PROFILES] } },
    ["action"],
    webSocketApi
  );

  const listPermissionsAdmin = getModel(
    scope,
    "listPermissionsAdminModel",
    {
      action: { enum: [MessageAction.LIST_PERMISSIONS] },
      filter: filterListPermissionsModel,
    },
    ["action"],
    webSocketApi
  );

  const manageProfilePermissionsAdmin = getModel(
    scope,
    "ManageProfilePermissionsAdminModel",
    {
      action: { enum: [MessageAction.MANAGE_PROFILE_PERMISSIONS] },
      request: manageProfilePermissionsModel,
    },
    ["action", "request"],
    webSocketApi
  );

  const listProfilePermissionsAdmin = getModel(
    scope,
    "listProfilePermissionsAdminModel",
    {
      action: { enum: [MessageAction.LIST_PROFILE_PERMISSIONS] },
      idPerfil: { type: JsonSchemaType.NUMBER },
    },
    ["action", "idPerfil"],
    webSocketApi
  );

  const addAccountAdmin = getModel(
    scope,
    "addAccountAdminModel",
    { action: { enum: [MessageAction.ADD_ACCOUNT] }, account: accountModel },
    ["action", "account"],
    webSocketApi
  );

  const updateAccountAdmin = getModel(
    scope,
    "updateAccountAdminModel",
    {
      action: { enum: [MessageAction.UPDATE_ACCOUNT] },
      account: updateAccountModel,
    },
    ["action", "account"],
    webSocketApi
  );

  const deleteAccountAdmin = getModel(
    scope,
    "deleteAccountAdminModel",
    {
      action: { enum: [MessageAction.DELETE_ACCOUNT] },
      account: { type: JsonSchemaType.NUMBER },
    },
    ["action", "account"],
    webSocketApi
  );

  const listAccountsAdmin = getModel(
    scope,
    "listAccountsAdminModel",
    {
      action: { enum: [MessageAction.LIST_ACCOUNTS] },
      filter: listAccountsModel,
      pagination: paginationModel,
    },
    ["action", "pagination"],
    webSocketApi
  );

  const countPagesAccountsAdmin = getModel(
    scope,
    "countPagesAccountsAdminModel",
    {
      action: { enum: [MessageAction.COUNT_PAGES_ACCOUNTS] },
      limit: { type: JsonSchemaType.NUMBER },
    },
    ["action", "limit"],
    webSocketApi
  );

  const manageAccountLinkedUsersAdmin = getModel(
    scope,
    "manageAccountLinkedUsersAdminModel",
    {
      action: { enum: [MessageAction.MANAGE_ACCOUNT_LINKED_USERS] },
      request: manageAccountLinkedUsersModel,
    },
    ["action", "request"],
    webSocketApi
  );

  const listAccountLinkedUsersAdmin = getModel(
    scope,
    "listAccountLinkedUsersAdminModel",
    {
      action: { enum: [MessageAction.LIST_ACCOUNT_LINKED_USERS] },
      idConta: { type: JsonSchemaType.NUMBER },
    },
    ["action", "idConta"],
    webSocketApi
  );

  const countPagesUsersAdmin = getModel(
    scope,
    "countPagesUsersAdminModel",
    {
      action: { enum: [MessageAction.COUNT_PAGES_USERS] },
      limit: { type: JsonSchemaType.NUMBER },
    },
    ["action", "limit"],
    webSocketApi
  );

  return {
    getStateModel,
    addUser,
    updateUser,
    getUser,
    addAddressUser,
    updateAddressUser,
    getAddressesUser,
    listProfilesAdmin,
    listPermissionsAdmin,
    manageProfilePermissionsAdmin,
    listProfilePermissionsAdmin,
    addAccountAdmin,
    updateAccountAdmin,
    deleteAccountAdmin,
    listAccountsAdmin,
    countPagesAccountsAdmin,
    manageAccountLinkedUsersAdmin,
    listAccountLinkedUsersAdmin,
    countPagesUsersAdmin,
  };
};
