import { Module } from '@nestjs/common'

import { ChildrenTokens } from './constants/tokens'
import { PrismaChildRepository } from './database/repository/prisma-child.repository'
import { BrowseChildrenController } from './handlers/http/controllers/browse-children.controller'
import { ReadChildController } from './handlers/http/controllers/read-child.controller'
import { ReviewChildController } from './handlers/http/controllers/review-child.controller'
import { BrowseChildrenService } from './services/browse-children/browse-children.service'
import { ReadChildService } from './services/read-child/read-child.service'
import { ReviewChildService } from './services/review-child/review-child.service'

@Module({
  controllers: [
    BrowseChildrenController,
    ReadChildController,
    ReviewChildController,
  ],
  providers: [
    BrowseChildrenService,
    ReadChildService,
    ReviewChildService,
    {
      provide: ChildrenTokens.ChildRepository,
      useClass: PrismaChildRepository,
    },
  ],
})
export class ChildrenModule {}
