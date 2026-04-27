import { Module } from '@nestjs/common'

import { ChildrenTokens } from './constants/tokens'
import { PrismaChildRepository } from './database/repository/prisma-child.repository'
import { BrowseChildrenController } from './handlers/http/controllers/browse-children.controller'
import { BrowseChildrenNeighborhoodsController } from './handlers/http/controllers/browse-children-neighborhoods.controller'
import { ReadChildController } from './handlers/http/controllers/read-child.controller'
import { ReviewChildController } from './handlers/http/controllers/review-child.controller'
import { BrowseChildrenService } from './services/browse-children/browse-children.service'
import { BrowseChildrenNeighborhoodsService } from './services/browse-children-neighborhoods/browse-children-neighborhoods.service'
import { ReadChildService } from './services/read-child/read-child.service'
import { ReviewChildService } from './services/review-child/review-child.service'
import { PrismaService } from '@/shared/database/prisma.service'
import { ContextModule } from '@/shared/context/context.module'
import { JwtAuthGuard } from '@/shared/guards/jwt-auth.guard'

@Module({
  imports: [ContextModule],
  controllers: [
    BrowseChildrenController,
    BrowseChildrenNeighborhoodsController,
    ReadChildController,
    ReviewChildController,
  ],
  providers: [
    JwtAuthGuard,
    PrismaService,
    BrowseChildrenService,
    BrowseChildrenNeighborhoodsService,
    ReadChildService,
    ReviewChildService,
    {
      provide: ChildrenTokens.ChildRepository,
      useClass: PrismaChildRepository,
    },
  ],
})
export class ChildrenModule {}
