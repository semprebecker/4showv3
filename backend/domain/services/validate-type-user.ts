export const validateTypeUser = (data: string): boolean =>  {
  const type = data.toLowerCase().substring(0, 2)
  if (type === "ju" || type === "fi") return true
  else return false
}
