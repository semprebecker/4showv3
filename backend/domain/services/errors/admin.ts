export class ListProfilesError extends Error {
  constructor() {
    super("List Profiles failed");
    this.name = "ListProfilesError";
  }
}

export class ListPermissionsError extends Error {
  constructor() {
    super("List Permissions failed");
    this.name = "ListPermissionsError";
  }
}

export class ManageProfilePermissionsError extends Error {
  constructor() {
    super("Manage Profile Permissions failed");
    this.name = "ManageProfilePermissionsError";
  }
}

export class ListProfilePermissionsError extends Error {
  constructor() {
    super("List Profile Permissions failed");
    this.name = "ListProfilePermissionsError";
  }
}

export class AddAccountError extends Error {
  constructor() {
    super("Add Account failed");
    this.name = "AddAccountError";
  }
}

export class SameUrlNameLiveError extends Error {
  constructor() {
    super("Url name live already exists");
    this.name = "SameUrlNameLiveError";
  }
}

export class CpfCnpjInvalidError extends Error {
  constructor() {
    super("Cpf/Cnpj is invalid");
    this.name = "CpfCnpjInvalidError";
  }
}

export class TypePersonInvalidError extends Error {
  constructor() {
    super("Type Person is invalid. Only Available (Juridico(a)/Fisico(a))");
    this.name = "TypePersonInvalidError";
  }
}

export class ZipCodeInvalidError extends Error {
  constructor() {
    super("Zip Code is invalid");
    this.name = "ZipCodeInvalidError";
  }
}

export class UpdateAccountError extends Error {
  constructor() {
    super("Update Account failed");
    this.name = "UpdateAccountError";
  }
}

export class DeleteAccountError extends Error {
  constructor() {
    super("Delete Account failed");
    this.name = "DeleteAccountError";
  }
}

export class ListAccountsError extends Error {
  constructor() {
    super("List Accounts failed");
    this.name = "ListAccountsError";
  }
}

export class ListAccountsRequestError extends Error {
  constructor() {
    super(
      "Filter undefined or not Available. (nome, email, cpfCnpj, nomeParamLive)"
    );
    this.name = "ListAccountsRequestError";
  }
}

export class CountPagesAccountsError extends Error {
  constructor() {
    super("Count pages accounts failed");
    this.name = "CountPagesAccountsError";
  }
}

export class ManageAccountLinkedUsersError extends Error {
  constructor() {
    super("Manage accounts linked users failed");
    this.name = "ManageAccountLinkedUsersError";
  }
}

export class ListAccountLinkedUsersError extends Error {
  constructor() {
    super("List account linked users failed");
    this.name = "ListAccountLinkedUsersError";
  }
}

export class ListUsersError extends Error {
  constructor() {
    super("List Users failed");
    this.name = "ListUsersError";
  }
}
