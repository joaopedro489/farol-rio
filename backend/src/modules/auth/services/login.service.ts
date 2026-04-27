import { Inject, Injectable } from '@nestjs/common'
import { AuthTokens } from '../constants/tokens'
import { UserRepository } from '../database/repository/user.repository'
import {
  UserNotFoundError,
  WrongPasswordError,
} from '../domain/errors/auth.error'
import { JwtHandler } from '../adapters/jwt-handlers'

type Params = {
  email: string
  password: string
}

type Result = {
  token: string
}

@Injectable()
export class LoginService {
  constructor(
    @Inject(AuthTokens.UserRepository)
    private readonly userRepository: UserRepository,

    @Inject(AuthTokens.JwtHandler)
    private readonly jwtHandler: JwtHandler,
  ) {}

  async login({ email, password }: Params): Promise<Result> {
    const user = await this.userRepository.findUserByEmail(email)
    if (!user) throw new UserNotFoundError()

    const isPasswordValid = await user.validatePassword(password)
    if (!isPasswordValid) throw new WrongPasswordError()

    const token = this.jwtHandler.generateToken(user.id, user.email)
    return { token }
  }
}
