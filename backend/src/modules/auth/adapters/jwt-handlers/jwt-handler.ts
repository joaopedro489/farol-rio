import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { JwtHandler } from './jwt-handler.interface'

@Injectable()
export class JwtNestHandler implements JwtHandler {
  constructor(private readonly jwtService: JwtService) {}

  decode(token: string): JwtHandler.DecodeResponse {
    return this.jwtService.decode(token)
  }

  verifyToken(token: string): JwtHandler.VerifyResponse {
    const isValid = this.verify({
      secret: process.env.JWT_SECRET as string,
      token,
    })
    return isValid
  }

  generateToken(userId: number, preferredUsername: string) {
    return this.generate({
      userId,
      preferredUsername,
      secret: process.env.JWT_SECRET as string,
      expiresIn: Number(process.env.JWT_EXPIRES_IN),
    })
  }

  private generate({
    userId,
    secret,
    preferredUsername,
    expiresIn,
  }: JwtHandler.GenerateParams) {
    return this.jwtService.sign<{
      sub: number
      preferredUsername: string
    }>({ sub: userId, preferredUsername }, { secret, expiresIn })
  }

  private verify({ secret, token }: JwtHandler.ValidateParams) {
    try {
      this.jwtService.verify(token, { secret })
      return true
    } catch {
      return false
    }
  }
}
