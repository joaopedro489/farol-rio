import { Controller, Get, UseGuards } from '@nestjs/common'

import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard'

import { DashboardSettingsRoutes } from '../../../settings/routes'
import { AlertsBySeverityService } from '../../../services/alerts-by-severity/alerts-by-severity.service'

@Controller(DashboardSettingsRoutes.ALERTS_BY_SEVERITY)
@UseGuards(JwtAuthGuard)
export class AlertsBySeverityController {
  constructor(
    private readonly alertsBySeverityService: AlertsBySeverityService,
  ) {}

  @Get()
  handle() {
    return this.alertsBySeverityService.getAlertsBySeverity()
  }
}
