import { Module } from '@nestjs/common'

import { DashboardTokens } from './constants/tokens'
import { PrismaDashboardRepository } from './database/repository/prisma-dashboard.repository'
import { AlertsByNeighborhoodController } from './handlers/http/controllers/alerts-by-neighborhood.controller'
import { AlertsBySeverityController } from './handlers/http/controllers/alerts-by-severity.controller'
import { AlertsByTypeController } from './handlers/http/controllers/alerts-by-type.controller'
import { SummaryController } from './handlers/http/controllers/summary.controller'
import { AlertsByNeighborhoodService } from './services/alerts-by-neighborhood/alerts-by-neighborhood.service'
import { AlertsBySeverityService } from './services/alerts-by-severity/alerts-by-severity.service'
import { AlertsByTypeService } from './services/alerts-by-type/alerts-by-type.service'
import { SummaryService } from './services/summary/summary.service'
import { PrismaService } from '@/shared/database/prisma.service'
import { ContextModule } from '@/shared/context/context.module'
import { JwtAuthGuard } from '@/shared/guards/jwt-auth.guard'

@Module({
  imports: [ContextModule],
  controllers: [
    SummaryController,
    AlertsByTypeController,
    AlertsBySeverityController,
    AlertsByNeighborhoodController,
  ],
  providers: [
    JwtAuthGuard,
    SummaryService,
    PrismaService,
    AlertsByTypeService,
    AlertsBySeverityService,
    AlertsByNeighborhoodService,
    {
      provide: DashboardTokens.DashboardRepository,
      useClass: PrismaDashboardRepository,
    },
  ],
})
export class DashboardModule {}
