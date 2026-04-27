import { Injectable } from '@nestjs/common'

import nodeContext from '../lib/node.context'

import { Context } from './context.interface'

@Injectable()
export class NodeContext implements Context {
  set<T>(key: string, value: T): void {
    nodeContext.set(key, value)
  }

  get<T>(key: string): T {
    return nodeContext.get<T>(key) as T
  }
}
