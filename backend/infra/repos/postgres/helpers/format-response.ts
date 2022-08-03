import { ExecuteStatementCommandOutput } from "@aws-sdk/client-rds-data";

interface response {
  [x: string]: string | undefined | boolean | number | null
}
type Output = response[]

export const formatResponse = async (data: ExecuteStatementCommandOutput): Promise<Output> => {
  const { columnMetadata, records } = data
  const arrayResponse: Output = []
  records?.map((arrayV) => {
    let model = {}
    arrayV?.forEach((value, indexV) => {
      model = {...model, [columnMetadata![indexV].label!]: !value.isNull ? Object.values(value)[0] : null }
    })
    arrayResponse.push(model)
  })
  return arrayResponse
};
