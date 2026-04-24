import { Controller, Get, UseGuards } from '@nestjs/common'

import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard'

import { DashboardSettingsRoutes } from '../../../settings/routes'
import { SummaryService } from '../../../services/summary/summary.service'

@Controller(DashboardSettingsRoutes.SUMMARY)
@UseGuards(JwtAuthGuard)
export class SummaryController {
  constructor(private readonly summaryService: SummaryService) {}

  @Get()
  handle() {
    return this.summaryService.getSummary()
  }
}
