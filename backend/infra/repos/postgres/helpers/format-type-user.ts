export const typeUser = (typeUser: string | any[]): string | any[] => {
  if(typeof typeUser === 'string'){
    return typeUser.toLowerCase() === "ju" ? "Jurídica" : "Física"
  } else {
    return typeUser.map(element => {
      return { ...element, tipoPessoa: element.tipoPessoa.toLowerCase() === "ju" ? "Jurídica" : "Física" }
    })
  }
}
