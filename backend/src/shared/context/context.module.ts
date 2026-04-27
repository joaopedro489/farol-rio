import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'

import { NodeContext } from './services'
import { SharedTokens } from '../constants/tokens'
import { ContextMiddleware } from './context.middleware'

@Module({
  imports: [],
  providers: [
    {
      provide: SharedTokens.Context,
      useClass: NodeContext,
    },
  ],
  exports: [SharedTokens.Context],
})
export class ContextModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ContextMiddleware).forRoutes('*')
  }
}
