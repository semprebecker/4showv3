type Input = { page: number, limit: number}
type Output = { page: number, limit: number }

export const pagionationHandler = ({ page, limit }:Input): Output => ({ page: (page - 1) * limit, limit })
