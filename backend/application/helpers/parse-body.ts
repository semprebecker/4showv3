export type Body = any

export const parseBody = (body: string | object): Body => (JSON.parse(typeof body === 'object' ? JSON.stringify(body) : body))
