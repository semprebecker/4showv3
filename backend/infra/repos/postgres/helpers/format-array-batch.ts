export const formatArrayBatch = async (data: any[]): Promise<any> => {
  const properties = formatModel(data)
  return properties
};

const formatModel = (array: any[]): { property: string, value: string}[][] => {
  return array.map((obj) => {
    let arrModel: any[] = []
    Object.keys(obj).map((key) => {
      arrModel.push({ name: `${key}`, value: { [getType(obj[key])]: obj[key] && obj[key] !== '' ? obj[key] : true }})
    })
    return arrModel
  })
}

const getType = (value: any): string => {
  switch (typeof value) {
    case 'string':
      return "stringValue";
    case 'number':
      return "doubleValue";
    case 'boolean':
      return "booleanValue"
    default:
      return "isNull";
  }
}
