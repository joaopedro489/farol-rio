import { Controller, Get, UseGuards } from '@nestjs/common'

import { JwtAuthGuard } from '@/shared/guards/jwt-auth.guard'

import { DashboardSettingsRoutes } from '../../../settings/routes'
import { AlertsByTypeService } from '../../../services/alerts-by-type/alerts-by-type.service'

@Controller(DashboardSettingsRoutes.ALERTS_BY_TYPE)
@UseGuards(JwtAuthGuard)
export class AlertsByTypeController {
  constructor(private readonly alertsByTypeService: AlertsByTypeService) {}

  @Get()
  handle() {
    return this.alertsByTypeService.getAlertsByType()
  }
}
