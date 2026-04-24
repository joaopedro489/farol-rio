import {
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { SharedTokens } from '../constants/tokens'
import { Context } from '../context'
import { ContextKey } from '../context/types/enum/context-key.enum'

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

  handleRequest(err, params) {
    if (err || !params.user) throw err || new UnauthorizedException()

    this.context.set(ContextKey.USER, params.user)

    return params.user
  }
}
