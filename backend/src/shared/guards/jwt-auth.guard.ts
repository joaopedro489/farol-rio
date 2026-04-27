import {
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { SharedTokens } from '../constants/tokens'
import { Context, UserContext } from '../context'
import { ContextKey } from '../context/types/enum/context-key.enum'

type AuthParams = { user: UserContext | null } | false

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt-passport') {
  constructor(
    @Inject(SharedTokens.Context)
    private readonly context: Context,
  ) {
    super()
  }

  canActivate(context: ExecutionContext) {
    return super.canActivate(context)
  }

  handleRequest<T = UserContext>(err: Error | null, params: AuthParams): T {
    if (err || !params || !params.user) throw err || new UnauthorizedException()

    this.context.set(ContextKey.USER, params.user)

    return params.user as T
  }
}
