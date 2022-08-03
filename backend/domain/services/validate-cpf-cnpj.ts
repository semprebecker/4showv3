export const validateCpfCnpj = (data: string): boolean =>  {
  if (data.length === 11) {
    data = data.replace(/[^\d]+/g, "");
    let soma
    let resto
    soma = 0
    if (data === "00000000000") return false
    for (let i = 1; i <= 9; i++) {
      soma = soma + parseInt(data.substring(i - 1, i)) * (11 - i)
      resto = soma * 10 % 11
    }
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(data.substring(9, 10))) return false
    soma = 0
    for (let i = 1; i <= 10; i++)
      soma = soma + parseInt(data.substring(i - 1, i)) * (12 - i)
    resto = soma * 10 % 11
    if (resto === 10 || resto === 11) resto = 0
    if (resto !== parseInt(data.substring(10, 11))) return false
    return true
  } else if (data.length === 14) {
    data = data.replace(/[^\d]+/g, "")
    if (data === "") return false;
    // Elimina CNPJs invalidos conhecidos
    if (
      data === "00000000000000" ||
      data === "11111111111111" ||
      data === "22222222222222" ||
      data === "33333333333333" ||
      data === "44444444444444" ||
      data === "55555555555555" ||
      data === "66666666666666" ||
      data === "77777777777777" ||
      data === "88888888888888" ||
      data === "99999999999999"
    )
      return false;
    // Valida DVs
    var tamanho = data.length - 2
    var numeros = data.substring(0, tamanho)
    var digitos = data.substring(tamanho)
    var soma = 0
    var pos = tamanho - 7
    for (let i = tamanho; i >= 1; i--) {
      soma += +numeros.charAt(tamanho - i) * pos--
      if (pos < 2) pos = 9
    }
    var resultado = soma % 11 < 2 ? 0 : 11 - soma % 11
    if (resultado != +digitos.charAt(0)) return false
    tamanho = tamanho + 1
    numeros = data.substring(0, tamanho)
    soma = 0
    pos = tamanho - 7
    for (let i = tamanho; i >= 1; i--) {
      soma += +numeros.charAt(tamanho - i) * pos--
      if (pos < 2) pos = 9
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11
    if (resultado != +digitos.charAt(1)) return false
    return true
  } else {
    return false
  }
}
