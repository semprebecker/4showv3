export const generateUrlLive = (nameUrl: string) => {
  nameUrl = nameUrl.toLowerCase().replace(/[^a-z0-9]+/g, "-"); // caracteres
  return nameUrl
}
