import { ExecuteStatementCommand, RDSDataClient, BeginTransactionCommand, CommitTransactionCommand, RollbackTransactionCommand, BatchExecuteStatementCommand } from "@aws-sdk/client-rds-data";
import { getSecrets } from "../../../gateways/secretsmanager";

type ExecuteInput = { query: string, transactionId: string }
type BatchInput = { query: string, transactionId: string, array: any[] }

export class DbTransaction {
  private static instance?: DbTransaction
  private client: RDSDataClient
  private input: {
    secretArn: string,
    resourceArn: string,
    database: string,
    includeResultMetadata: boolean
  }

  constructor() {
    this.client = new RDSDataClient({ region: "us-east-1" })
  }

  static getInstance(): DbTransaction  {
    if (DbTransaction.instance === undefined) DbTransaction.instance = new DbTransaction()
    return DbTransaction.instance
  }

  private async beginTransactionCommand(): Promise<BeginTransactionCommand> {
    if (this.input === undefined) {
      const variables = await getSecrets()
      this.input = { ...variables, includeResultMetadata: true }
    }
    return new BeginTransactionCommand({ resourceArn: this.input.resourceArn, secretArn: this.input.secretArn, database: this.input.database });
  }

  private async executeStatement({ query, transactionId }: ExecuteInput): Promise<ExecuteStatementCommand> {
    if (this.input === undefined) {
      const variables = await getSecrets()
      this.input = { ...variables, includeResultMetadata: true }
    }
    return new ExecuteStatementCommand({ ...this.input, transactionId, sql: query });
  }

  private async batchExecuteStatement({ query, transactionId, array }: BatchInput): Promise<BatchExecuteStatementCommand> {
    if (this.input === undefined) {
      const variables = await getSecrets()
      this.input = { ...variables, includeResultMetadata: true }
    }
    return new BatchExecuteStatementCommand({ ...this.input, transactionId, sql: query, parameterSets: array});
  }

  private async commitTransactionCommand(transactionId: string): Promise<CommitTransactionCommand> {
    if (this.input === undefined) {
      const variables = await getSecrets()
      this.input = { ...variables, includeResultMetadata: true }
    }
    return new CommitTransactionCommand({ transactionId, resourceArn: this.input.resourceArn, secretArn: this.input.secretArn });
  }

  private async rollbackTransactionCommand(transactionId: string): Promise<RollbackTransactionCommand> {
    if (this.input === undefined) {
      const variables = await getSecrets()
      this.input = { ...variables, includeResultMetadata: true }
    }
    return new RollbackTransactionCommand({ transactionId, resourceArn: this.input.resourceArn, secretArn: this.input.secretArn });
  }

  async begin(): Promise<any>  {
    const command = await this.beginTransactionCommand()
    return (await this.client.send(command)).transactionId ?? ''
  }

  async execute(req: ExecuteInput): Promise<any>  {
    const command = await this.executeStatement(req)
    return this.client.send(command)
  }

  async batchExecute(req: BatchInput): Promise<any>  {
    const command = await this.batchExecuteStatement(req)
    return this.client.send(command)
  }

  async commit(transactionId: string): Promise<any>  {
    const command = await this.commitTransactionCommand(transactionId)
    return (await this.client.send(command)).transactionStatus ?? ''
  }

  async rollback(transactionId: string): Promise<any>  {
    const command = await this.rollbackTransactionCommand(transactionId)
    return (await this.client.send(command)).transactionStatus ?? ''
  }

  disconnect(): void  {
    this.client.destroy()
  }
}
