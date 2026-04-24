import { Controller, Get, UseGuards } from '@nestjs/common'

import { JwtAuthGuard } from '@/shared/guards/jwt-auth.guard'

import { DashboardSettingsRoutes } from '../../../settings/routes'
import { AlertsByNeighborhoodService } from '../../../services/alerts-by-neighborhood/alerts-by-neighborhood.service'

@Controller(DashboardSettingsRoutes.ALERTS_BY_NEIGHBORHOOD)
@UseGuards(JwtAuthGuard)
export class AlertsByNeighborhoodController {
  constructor(
    private readonly alertsByNeighborhoodService: AlertsByNeighborhoodService,
  ) {}

  @Get()
  handle() {
    return this.alertsByNeighborhoodService.getAlertsByNeighborhood()
  }
}
