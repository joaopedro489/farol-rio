import { Inject, Injectable } from '@nestjs/common'

import { DashboardTokens } from '../../constants/tokens'
import { DashboardRepository } from '../../database/repository/dashboard.repository'
import { AlertsBySeverityOutput } from '../../domain/outputs/alerts-by-severity.output'

@Injectable()
export class AlertsBySeverityService {
  constructor(
    @Inject(DashboardTokens.DashboardRepository)
    private readonly dashboardRepository: DashboardRepository,
  ) {}

  getAlertsBySeverity(): Promise<AlertsBySeverityOutput> {
    return this.dashboardRepository.getAlertsBySeverity()
  }
}
