import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import { asyncLocalStorage } from './lib/node.context'

@Injectable()
export class ContextMiddleware implements NestMiddleware {
  use(_req: Request, _res: Response, next: NextFunction) {
    asyncLocalStorage.run({}, next)
  }
}
