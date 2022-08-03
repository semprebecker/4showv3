export class AddUserError extends Error {
  constructor (Error?: string) {
    super('Create User failed')
    this.name = 'CreateUserError'
    this.message = Error !== undefined ? Error : 'Cognito Error'
  }
}

export class UpdateUserError extends Error {
  constructor () {
    super('Update User failed')
    this.name = 'UpdateUserError'
  }
}

export class GetUserError extends Error {
  constructor () {
    super('Get User failed')
    this.name = 'GetUserError'
  }
}

export class AddAddressUserError extends Error {
  constructor () {
    super('Create Address User failed')
    this.name = 'AddAddressUserError'
  }
}

export class UpdateAddressUserError extends Error {
  constructor () {
    super('Update Address User failed')
    this.name = 'UpdateAddressUserError'
  }
}

export class GetAddressesUserError extends Error {
  constructor () {
    super('Get User Addresses failed')
    this.name = 'GetAddressesUserError'
  }
}
