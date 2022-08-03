export const validateZipCode = (data: string): boolean =>  {
  if (data.length === 9) return true
  else return false
}
