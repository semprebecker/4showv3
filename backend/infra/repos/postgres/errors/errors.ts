export class DatabaseError extends Error {
  constructor (error: Error) {
    super('Database failed. Try again soon')
    this.name = 'DatabaseError'
    this.stack = error.stack
  }
}
