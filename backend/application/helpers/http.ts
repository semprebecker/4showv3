export type HttpResponse = {
  statusCode: number
  body: string
}

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: typeof data === 'string' ? data : JSON.stringify(data)
})
