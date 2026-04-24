import { Inject, Injectable } from '@nestjs/common'

import { DashboardTokens } from '../../constants/tokens'
import { DashboardRepository } from '../../database/repository/dashboard.repository'
import { AlertsByTypeOutput } from '../../domain/outputs/alerts-by-type.output'

@Injectable()
export class AlertsByTypeService {
  constructor(
    @Inject(DashboardTokens.DashboardRepository)
    private readonly dashboardRepository: DashboardRepository,
  ) {}

  getAlertsByType(): Promise<AlertsByTypeOutput> {
    return this.dashboardRepository.getAlertsByType()
  }
}
