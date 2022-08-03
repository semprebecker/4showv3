export type InputAdd = { idUsuario: string, nome: string, email: string, tipoPessoa: string, cpfCnpj: string | null, telefone: string, }
export type OutputAdd = { idUsuario: string}

export type InputUpdate = { idUsuario: string, nome: string, email: string, tipoPessoa: string, cpfCnpj: string | null, telefone: string }
export type OutputUpdate = { nome: string, email: string, idPerfil: number, nomePerfil: string, tipoPessoa: string, cpfCnpj: string | null, telefone: string, ativo: boolean }

export type InputGet = { idUsuario: string }
export type OutputGet =  { nome: string, email: string, idPerfil: number, nomePerfil: string, tipoPessoa: string, cpfCnpj: string | null, telefone: string, ativo: boolean } | undefined

export type InputValidUserId = { idUsuario: string }
export type OutputValidUserId = { idUsuario: string }

export type InputAddAddress = { idUsuario: string, tipo: string, nome: string, logradouro: string, numero: number, cep: string, bairro: string, cidade: string, complemento: string | null, telefone: string, selecionado: boolean | null }
export type OutputAddAddress = { idEndereco: number, tipo: string, selecionado: boolean, dataCadastro: Date }

export type InputGetUserAccount = { idUsuario: string }
export type OutputGetUserAccount = { nomePerfil: string } | undefined

export type InputUpdateAddress = { idUsuario: string, idEndereco: number, nome: string, logradouro: string, numero: number, cep: string, bairro: string, cidade: string, complemento: string | null, telefone: string, selecionado: boolean }
export type OutputUpdateAddress = { idEndereco: number, tipo: string, nome: string, logradouro: string, numero: number, cep: string, bairro: string, cidade: string, complemento: string | null, telefone: string, selecionado: boolean, dataCadastro: Date, dataAlteracao: Date | null }

export type InputGetAddresses = { idUsuario: string }
export type OutputGetAddresses = { idEndereco: number, tipo: string, nome: string, logradouro: string, numero: number, cep: string, bairro: string, cidade: string, complemento: string | null, telefone: string, selecionado: boolean, dataCadastro: Date, dataAlteracao: Date | null }[]
