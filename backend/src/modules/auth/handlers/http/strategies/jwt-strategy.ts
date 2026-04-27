import { Inject, Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

import { JWTType } from './jwt-type'
import { UserContext } from '@/shared/context'
import { AuthTokens } from '@/modules/auth/constants/tokens'
import { UserRepository } from '@/modules/auth/database/repository/user.repository'

type ValidateReturn = Promise<
  | {
      user: UserContext | null
    }
  | false
>

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt-passport') {
  constructor(
    @Inject(AuthTokens.UserRepository)
    private readonly userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET!,
    })
  }

  async validate({ sub }: JWTType): ValidateReturn {
    const userContext: UserContext | null =
      await this.userRepository.findUserContextById(sub)
    if (!userContext) return false

    return {
      user: userContext,
    }
  }
}
