export class ServerError extends Error {
  constructor (error: Error) {
    super(error.name ?? 'Server failed. Try again soon')
    this.name = error.name ?? 'ServerError'
    this.message = error.message ?? 'Server failed'
    this.stack = error.stack
  }
}

export class BadRequestError extends Error {
  constructor () {
    super('Missing event body')
    this.name = 'BadRequestError'
  }
}

export class UnauthorizedError extends Error {
  constructor () {
    super('Unauthorized')
    this.name = 'UnauthorizedError'
  }
}

export class ForbiddendError extends Error {
  constructor () {
    super('Access denied')
    this.name = 'ForbiddendError'
  }
}
