import 'dotenv/config'

export const envs = {
  stage: process.env.ENV!,
  secretsId: process.env.SECRET_ID!
}
