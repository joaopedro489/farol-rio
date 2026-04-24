import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common'
import { Request } from 'express'
import { Observable } from 'rxjs'

import { extractIp } from 'src/shared/utils/extract-ip'

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  private logger: Logger = new Logger(LoggerInterceptor.name)

  constructor() {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request: Request = context.switchToHttp().getRequest()

    this.logger.log(
      `Request ip=${extractIp(request)} method=${request.method} path=${request.path} query=${JSON.stringify(request.query)} body=${JSON.stringify(request.body)}`,
    )

    return next.handle()
  }
}
