export interface JwtHandler {
  decode(token: string): JwtHandler.DecodeResponse
  verifyToken(token: string): JwtHandler.VerifyResponse
  generateToken(userId: number, preferredUsername: string): string
}
export namespace JwtHandler {
  export type DecodeResponse = {
    userId: number
  }

  export type VerifyResponse = boolean

  export type GenerateParams = {
    userId: number
    preferredUsername: string
    secret: string
    expiresIn: number
  }

  export type ValidateParams = {
    token: string
    secret: string
  }
}
