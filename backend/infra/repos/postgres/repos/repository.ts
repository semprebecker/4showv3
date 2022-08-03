import { DatabaseError } from "../errors";
import { DbTransaction, formatResponse, formatArrayBatch } from '../helpers';

export abstract class PgRepository {
  constructor (private readonly connection: DbTransaction = DbTransaction.getInstance()) {}

  protected async perform (query: string, array?: any[]): Promise<any | undefined | DatabaseError> {
    const transaction = await this.connection.begin()
    try {
      if (array && array!.length > 0 && Array.isArray(array)){
        const arrayBatch = await formatArrayBatch(array)
        await this.connection.batchExecute({ query, transactionId: transaction, array: arrayBatch })
        await this.connection.commit(transaction)
        return undefined
      } else if (query && !array) {
        const res = await this.connection.execute({ query, transactionId: transaction})
        await this.connection.commit(transaction)
        return formatResponse(res)
      }
    } catch (e: any) { // { requestId, cfId, extendedRequestId } = e.$metadata
      await this.connection.rollback(transaction)
      throw new DatabaseError(e)
    } finally {
      this.connection.disconnect()
    }
  }
}
