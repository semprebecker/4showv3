import { MessageAction } from "./MessageAction";
import {
  AddUser,
  UpdateUser,
  AddAddressUser,
  UpdateAddressUser,
  ListPermissionsAdmin,
  ManageProfilePermissionsAdmin,
  AddAccountAdmin,
  UpdateAccountAdmin,
  ListAccountsAdmin,
  PagionationModel,
  ManageAccountLinkedUserAdmin,
} from "./models";

export type GetStateModel = {
  action: MessageAction.GET_STATE;
};

export type AddUserModel = {
  action: MessageAction.ADD_USER;
  user: AddUser;
};

export type UpdateUserModel = {
  action: MessageAction.UPDATE_USER;
  user: UpdateUser;
};

export type GetUserModel = {
  action: MessageAction.GET_USER;
};

export type AddAddressUserModel = {
  action: MessageAction.ADD_ADDRESS_USER;
  address: AddAddressUser;
};

export type UpdateAddressUserModel = {
  action: MessageAction.UPDATE_ADDRESS_USER;
  address: UpdateAddressUser;
};

export type GetAddressesUserModel = {
  action: MessageAction.GET_ADDRESSES_USER;
};

export type ListProfilesAdminModel = {
  action: MessageAction.LIST_PROFILES;
};

export type ListPermissionsAdminModel = {
  action: MessageAction.LIST_PERMISSIONS;
  filter: ListPermissionsAdmin;
};

export type ManageProfilePermissionsAdminModel = {
  action: MessageAction.MANAGE_PROFILE_PERMISSIONS;
  request: ManageProfilePermissionsAdmin;
};

export type ListProfilePermissionsAdminModel = {
  action: MessageAction.LIST_PROFILE_PERMISSIONS;
  idPerfil: number;
};

export type AddAccountAdminModel = {
  action: MessageAction.ADD_ACCOUNT;
  account: AddAccountAdmin;
};

export type UpdateAccountAdminModel = {
  action: MessageAction.UPDATE_ACCOUNT;
  account: UpdateAccountAdmin;
};

export type DeleteAccountAdminModel = {
  action: MessageAction.DELETE_ACCOUNT;
  account: number;
};

export type ListAccountsAdminModel = {
  action: MessageAction.LIST_ACCOUNTS;
  filter?: ListAccountsAdmin;
  pagination: PagionationModel;
};

export type CountPagesAccountsAdminModel = {
  action: MessageAction.COUNT_PAGES_ACCOUNTS;
  limit: number;
};

export type ManageAccountLinkedUsersAdminModel = {
  action: MessageAction.MANAGE_ACCOUNT_LINKED_USERS;
  request: ManageAccountLinkedUserAdmin;
};

export type ListAccountLinkedUsersAdminModel = {
  action: MessageAction.LIST_ACCOUNT_LINKED_USERS;
  idConta: number;
};

export type CountPagesUsersAdminModel = {
  action: MessageAction.COUNT_PAGES_USERS;
  limit: number;
};
