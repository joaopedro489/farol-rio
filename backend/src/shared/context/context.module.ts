import { Module } from '@nestjs/common'

import { NodeContext } from './services'
import { SharedTokens } from '../constants/tokens'

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
export class ContextModule {}
